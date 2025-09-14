const { REST } = require('discord.js');

let _loadPromise = null;

/**
 * Загружает эмодзи из Application Emojis API
 */
async function loadApplicationEmojis() {
  if (_loadPromise) return _loadPromise;

  _loadPromise = (async () => {
    try {
      const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
      const appId = process.env.CLIENT_ID;

      let list = await rest.get(`/applications/${appId}/emojis`);
      console.log('[emojis] Raw response keys:', Object.keys(list));

      // Попробуем извлечь массив эмодзи
      let emojis = [];
      if (Array.isArray(list)) {
        emojis = list;
      } else if (list.emojis && Array.isArray(list.emojis)) {
        emojis = list.emojis;
      } else if (list.items && Array.isArray(list.items)) {
        emojis = list.items;
      } else if (list.data && Array.isArray(list.data)) {
        emojis = list.data;
      } else if (list.results && Array.isArray(list.results)) {
        emojis = list.results;
      } else {
        emojis = Object.values(list).filter(e => e && e.id && e.name);
      }

      console.log(`[emojis] Loaded application emojis: ${emojis.length}`);

      const map = {};
      for (const e of emojis) {
        if (e.name && e.id) {
          map[e.name] = e.id;
        }
      }
      return map;
    } catch (err) {
      console.error('[emojis] Failed to load application emojis:', err.message);
      return {};
    }
  })();

  return _loadPromise;
}

/**
 * Сопоставляет имена эмодзи с ID
 */
async function resolveEmojisByName(_ignoredGuild, names) {
  const appMap = await loadApplicationEmojis();
  const nameToId = {};
  const missing = [];

  for (const n of names) {
    const id = appMap[n] || null;
    if (id) nameToId[n] = id;
    else missing.push(n);
  }

  if (missing.length) {
    console.log('Не найдены эмодзи:', missing.join(', '));
  }

  return { nameToId, missing };
}

module.exports = { loadApplicationEmojis, resolveEmojisByName };
