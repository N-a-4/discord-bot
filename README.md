# Discord Bot (CV2) — Emoji Proxy fallback

Эта сборка гарантирует, что обращения вида `emojis.NAME.id` не падают:
- В рантайме создаётся Proxy для `emojis`, который возвращает `{ id: undefined, name: NAME }` для неизвестных имён.
- `ButtonBuilder.setEmoji` «смягчён»: при `undefined`/пустом `id` просто ничего не делает.

Порядок запуска:
1) `npm i`
2) `.env`: `DISCORD_TOKEN`, `APPLICATION_ID`, `GUILD_ID`
3) `npm run register`
4) `npm start`
