# Discord Bot (CV2) — TS-style with Emoji IDs + /emojis.json

## Быстрый старт
1) npm i
2) .env: DISCORD_TOKEN, APPLICATION_ID, GUILD_ID, EMOJI_SYNC_KEY
3) npm run register
4) npm start

### Синк эмодзи из гильдии
GET /emojis.json?guildId=...&key=EMOJI_SYNC_KEY  → { items:[{name,id,animated}], count, guildId }
