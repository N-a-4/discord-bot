// resolveEmojisByName.js (diagnostic)
const { REST } = require('discord.js');

let _appEmojiMap = null;          // { name: id }
let _loadPromise = null;

function log(...args) {
  console.log('[emojis]', ...args);
}

/** Fetch and cache Application Emojis (name -> id). */
async function loadApplicationEmojis() {
  if (_appEmojiMap) return _appEmojiMap;
  if (_loadPromise) return _loadPromise;

  const token = process.env.DISCORD_TOKEN;
  const appId = process.env.CLIENT_ID;
  if (!token || !appId) {
    log('Missing env: DISCORD_TOKEN or CLIENT_ID');
    _appEmojiMap = {};
    return _appEmojiMap;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  _loadPromise = (async () => {
    try {
      // Try explicit appId route first, then @me fallback (some proxies accept only @me).
      let list = [];
      try {
        list = await rest.get(`/applications/${appId}/emojis`);
      } catch (e1) {
        log('Fallback to /applications/@me/emojis due to:', e1?.message || e1);
        list = await rest.get(`/applications/@me/emojis`);
      }

      const map = {};
      for (const e of list || []) {
        if (e?.name && e?.id) map[e.name] = e.id;
      }
      _appEmojiMap = map;
      const sample = Object.keys(map).slice(0, 10);
      log('Loaded application emojis:', Object.keys(map).length, sample.length ? `sample: ${sample.join(', ')}` : '');
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

/**
 * Resolve emoji IDs by name using only Application Emojis.
 * @param {*} _ignoredGuild - Not used
 * @param {string[]} names
 * @returns {Promise<{nameToId: Record<string,string>, missing: string[]}>}
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
    log('Missing names:', missing.join(', '));
  }
  return { nameToId, missing };
}

module.exports = { loadApplicationEmojis, resolveEmojisByName };