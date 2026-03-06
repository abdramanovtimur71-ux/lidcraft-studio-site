# Постоянный публичный домен для LidCraft Studio

Сайт уже подготовлен к постоянному деплою:
- `CNAME`
- `netlify.toml`
- `vercel.json`
- `_redirects`
- `.github/workflows/pages.yml`

## Вариант 1 (самый быстрый): Netlify

1. Перейдите на https://app.netlify.com/drop
2. Перетащите папку `aura-site` в окно браузера.
3. Получите постоянный URL вида `*.netlify.app`.
4. В `Domain management` подключите ваш закрепленный ngrok-домен.
5. В DNS у регистратора домена добавьте записи, которые покажет Netlify.

## Вариант 2: Vercel

1. Перейдите на https://vercel.com/new
2. Импортируйте папку/репозиторий `aura-site`.
3. После деплоя используйте закрепленный ngrok-домен в Project Settings -> Domains (если нужно).

## Вариант 3: GitHub Pages

1. Загрузите `aura-site` в GitHub-репозиторий.
2. Включите Pages для ветки `main` (GitHub Actions).
3. Workflow `pages.yml` опубликует сайт автоматически.
4. В настройках репозитория подключите закрепленный ngrok-домен (если используете GitHub Pages).

## Что заменить перед продом

- В `index.html` и `links.html` замените тестовые ссылки оплаты `replace-start/growth/scale` на реальные.
- Проверьте контакты: Telegram, WhatsApp, Email.

## Рекомендация

Для бизнеса лучше запускать через Netlify/Vercel с собственным доменом.
Это убирает зависимость от вашего компьютера и от ngrok.
