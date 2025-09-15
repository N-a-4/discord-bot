// resolveEmojisByName.js (robust)
const { REST } = require('discord.js');

let _appEmojiMap = null;
let _loadPromise = null;

function log(...args) { console.log('[emojis]', ...args); }

function normalizeList(list) {
  if (!list) return [];
  if (Array.isArray(list)) return list;

  // Частые обёртки
  const shapes = ['emojis', 'items', 'data', 'results', 'list'];
  for (const k of shapes) {
    if (Array.isArray(list[k])) return list[k];
  }

  // Если пришёл объект-словарь — попробуем вытащить его значения с id/name
  if (typeof list === 'object') {
    const vals = Object.values(list).filter(v => v && typeof v === 'object');
    const candidates = vals.filter(v => ('id' in v) || ('name' in v));
    if (candidates.length >= 1) return candidates;
  }

  return [];
}

async function loadApplicationEmojis() {
  if (_appEmojiMap) return _appEmojiMap;
  if (_loadPromise) return _loadPromise;

  const token = process.env.DISCORD_TOKEN;
  const appId  = process.env.CLIENT_ID;
  if (!token || !appId) {
    log('Missing DISCORD_TOKEN or CLIENT_ID');
    _appEmojiMap = {};
    return _appEmojiMap;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  _loadPromise = (async () => {
    try {
      let list;
      let src = 'id';
      try {
        list = await rest.get(`/applications/${appId}/emojis`);
      } catch (e1) {
        log('Fallback to /applications/@me/emojis due to:', e1?.message || e1);
        src = '@me';
        list = await rest.get(`/applications/@me/emojis`);
      }

      const arr = normalizeList(list);
      if (!Array.isArray(arr)) {
        log('Unexpected response type:', typeof list, list && Object.keys(list));
      }

      const map = {};
      for (const e of arr) {
        const id = e?.id;
        const name = e?.name;
        if (id && name) map[name] = id;
      }

      _appEmojiMap = map;
      log(`Loaded application emojis from /applications/${src}/emojis:`, Object.keys(map).length);
      return _appEmojiMap;
    } catch (err) {
      log('Failed to load application emojis:', err?.message || err);
      _appEmojiMap = {};
      return _appEmojiMap;
    } finally {
      _loadPromise = null;
    }
  })();

  return _loadPromise;
}

async function resolveEmojisByName(_ignoredGuild, names) {
  const appMap = await loadApplicationEmojis();
  const nameToId = {};
  const missing = [];

  for (const n of names) {
    const id = appMap[n] || null;
    if (id) nameToId[n] = id;
    else missing.push(n);
  }

  if (missing.length) log('Missing names:', missing.join(', '));
  return { nameToId, missing };
}

module.exports = { loadApplicationEmojis, resolveEmojisByName };
