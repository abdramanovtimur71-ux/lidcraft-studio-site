# LidCraft Studio — быстрый запуск и финальная настройка

## Что заменить перед отправкой клиентам

- В `index.html`:
  - `https://your-domain.com` на ваш домен
  - `https://your-domain.com/og-cover.jpg` на реальную обложку
  - `your_username` на ваш username
  - `000000000000` на номер WhatsApp в международном формате
   - `hello@lidcraft-studio.site` на ваш email
   - `https://pay.cloudtips.ru/p/replace-start` на вашу ссылку оплаты Start
   - `https://pay.cloudtips.ru/p/replace-growth` на вашу ссылку оплаты Growth
   - `https://pay.cloudtips.ru/p/replace-scale` на вашу ссылку оплаты Scale
- В `links.html` заменить те же значения.
- В `account.html` заменить те же платежные ссылки.

## Как запустить локально

1. Откройте папку `aura-site`.
2. Запустите команду:
   ```powershell
   python -m http.server 5500
   ```
3. Откройте в браузере:
   - `http://localhost:5500/index.html`
   - `http://localhost:5500/links.html`
   - `http://localhost:5500/auth.html`
   - `http://localhost:5500/account.html`

## Восстановление пароля (dev-режим)

- Если SMTP/SMS пока не подключены, backend может работать с `PASSWORD_RECOVERY_DEV_FALLBACK=true`.
- В этом режиме код подтверждения показывается в интерфейсе `auth.html` после запроса, чтобы можно было сразу протестировать смену пароля.

## Публикация

- GitHub Pages / Netlify / Vercel (статический сайт).
- В био соцсетей поставьте ссылку на `links.html`.

## Контент-план на 7 дней

- 2 Shorts/Reels в день.
- 1 пост-кейс в день.
- 20 диалогов в ЛС ежедневно с CTA на Telegram.
