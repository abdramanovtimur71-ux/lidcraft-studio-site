import json
import os
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path


HOST = "0.0.0.0"
PORT = int(os.getenv("AURA_WEBHOOK_PORT", "8002"))
LOG_FILE = Path(__file__).resolve().parent / "greenapi_webhook_events.jsonl"


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class GreenApiWebhookHandler(BaseHTTPRequestHandler):
    server_version = "LidCraftGreenAPI/1.0"

    def _send_json(self, status: int, payload: dict):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _append_event(self, payload: dict):
        record = {
            "receivedAt": utc_now_iso(),
            "path": self.path,
            "payload": payload,
        }
        with LOG_FILE.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

    def do_GET(self):
        if self.path == "/health":
            self._send_json(200, {"ok": True, "service": "greenapi-webhook", "time": utc_now_iso()})
            return

        if self.path == "/webhook/greenapi":
            self._send_json(200, {"ok": True, "message": "Use POST for Green API webhooks"})
            return

        self._send_json(404, {"ok": False, "error": "Not found"})

    def do_POST(self):
        if self.path != "/webhook/greenapi":
            self._send_json(404, {"ok": False, "error": "Not found"})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(content_length) if content_length > 0 else b"{}"
        try:
            payload = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self._send_json(400, {"ok": False, "error": "Invalid JSON"})
            return

        self._append_event(payload)
        event_type = payload.get("typeWebhook") or payload.get("type") or "unknown"
        self._send_json(200, {"ok": True, "received": True, "eventType": event_type})

    def log_message(self, format: str, *args):
        return


def main():
    server = HTTPServer((HOST, PORT), GreenApiWebhookHandler)
    print(f"Green API webhook server started on http://127.0.0.1:{PORT}", flush=True)
    print("Health: /health", flush=True)
    print("Webhook: /webhook/greenapi", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
