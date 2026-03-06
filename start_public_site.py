import os
import sys
import time
import signal
import atexit
import subprocess
from pathlib import Path

import requests

BASE_DIR = Path(__file__).resolve().parent
PORT = int(os.getenv("AURA_SITE_PORT", "5500"))
CHECK_INTERVAL = int(os.getenv("AURA_CHECK_INTERVAL", "8"))
PUBLIC_URL_FILE = BASE_DIR / "public_url.txt"
LOG_FILE = BASE_DIR / "public_site.log"

http_proc = None
ngrok_proc = None


def log(message: str):
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {message}"
    print(line, flush=True)
    with LOG_FILE.open("a", encoding="utf-8") as logf:
        logf.write(line + "\n")


def kill_process(proc):
    if not proc:
        return
    if proc.poll() is not None:
        return
    try:
        proc.terminate()
        proc.wait(timeout=5)
    except Exception:
        try:
            proc.kill()
        except Exception:
            pass


def cleanup(*_):
    log("Останавливаю процессы...")
    kill_process(ngrok_proc)
    kill_process(http_proc)


def start_http_server():
    cmd = [sys.executable, "-m", "http.server", str(PORT)]
    return subprocess.Popen(cmd, cwd=str(BASE_DIR), stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)


def start_ngrok():
    ngrok_url = os.getenv("NGROK_URL", "").strip()
    cmd = ["ngrok", "http"]
    if ngrok_url:
        # Use reserved ngrok domain when provided.
        cmd.extend(["--url", ngrok_url])
    cmd.append(str(PORT))
    return subprocess.Popen(cmd, cwd=str(BASE_DIR), stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)


def get_public_url(max_wait_sec=40):
    deadline = time.time() + max_wait_sec
    while time.time() < deadline:
        try:
            response = requests.get("http://127.0.0.1:4040/api/tunnels", timeout=3)
            response.raise_for_status()
            tunnels = response.json().get("tunnels", [])
            for tunnel in tunnels:
                url = tunnel.get("public_url", "")
                if url.startswith("https://"):
                    return url
            if tunnels:
                return tunnels[0].get("public_url")
        except Exception:
            pass
        time.sleep(1)
    return None


def mirror_output(proc, prefix):
    if not proc or not proc.stdout:
        return
    for _ in range(5):
        line = proc.stdout.readline()
        if not line:
            break
        log(f"{prefix}: {line.rstrip()}")


def ensure_running(proc_name, proc, starter):
    if proc is None or proc.poll() is not None:
        log(f"{proc_name} не запущен, перезапуск...")
        return starter()
    return proc


def main():
    global http_proc, ngrok_proc

    log("Запуск LidCraft Studio сайта в автономном режиме...")
    ngrok_url = os.getenv("NGROK_URL", "").strip()
    if ngrok_url:
        log(f"Использую закрепленный ngrok домен: {ngrok_url}")
    atexit.register(cleanup)
    signal.signal(signal.SIGTERM, cleanup)
    signal.signal(signal.SIGINT, cleanup)

    http_proc = start_http_server()
    time.sleep(1)
    ngrok_proc = start_ngrok()

    time.sleep(2)
    public_url = get_public_url()
    if public_url:
        full_url = public_url.rstrip("/") + "/index.html"
        PUBLIC_URL_FILE.write_text(full_url, encoding="utf-8")
        log(f"Публичный URL: {full_url}")
    else:
        log("Не удалось получить публичный URL из ngrok API")

    while True:
        mirror_output(http_proc, "http")
        mirror_output(ngrok_proc, "ngrok")

        http_proc = ensure_running("HTTP сервер", http_proc, start_http_server)
        ngrok_proc = ensure_running("ngrok", ngrok_proc, start_ngrok)

        if PUBLIC_URL_FILE.exists():
            pass
        else:
            public_url = get_public_url(max_wait_sec=10)
            if public_url:
                full_url = public_url.rstrip("/") + "/index.html"
                PUBLIC_URL_FILE.write_text(full_url, encoding="utf-8")
                log(f"Публичный URL восстановлен: {full_url}")

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    main()
