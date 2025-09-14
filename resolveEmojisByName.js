
// resolveEmojisByName.js
// Resolve emoji IDs by name **only** from Application Emojis (uploaded to the bot in Dev Portal).
// No guild/server lookups are performed here.
//
// Requires env vars:
//   - DISCORD_TOKEN  : bot token
//   - CLIENT_ID      : application (client) ID
//
// Exports:
//   - loadApplicationEmojis(): Promise<Record<string,string>>
//   - resolveEmojisByName(_ignoredGuild, names): Promise<{nameToId:Record<string,string>, missing:string[]}>
//
// How it works:
//   1) On first call, fetches /applications/{CLIENT_ID}/emojis via REST and builds name->id map.
//   2) Caches the map in memory for subsequent calls.
//   3) For each requested name, returns the ID if found; otherwise adds it to `missing`.

const { REST } = require('discord.js');

let _appEmojiMap = null;          // { name: id }
let _loadPromise = null;

/** Fetch and cache Application Emojis (name -> id). */
async function loadApplicationEmojis() {
  if (_appEmojiMap) return _appEmojiMap;
  if (_loadPromise) return _loadPromise;

  const token = process.env.DISCORD_TOKEN;
  const appId = process.env.CLIENT_ID;
  if (!token || !appId) {
    console.warn('[emojis] Missing DISCORD_TOKEN or CLIENT_ID; cannot fetch application emojis.');
    _appEmojiMap = {};
    return _appEmojiMap;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  _loadPromise = (async () => {
    try {
      const list = await rest.get(`/applications/${appId}/emojis`);
      const map = {};
      for (const e of list || []) {
        if (e?.name && e?.id) map[e.name] = e.id;
      }
      _appEmojiMap = map;
      console.log('[emojis] Application emojis loaded:', Object.keys(map).length);
      return _appEmojiMap;
    } catch (err) {
      console.error('[emojis] Failed to load application emojis:', err?.message || err);
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
 * @param {*} _ignoredGuild - Not used (kept for signature compatibility)
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

  return { nameToId, missing };
}

module.exports = { loadApplicationEmojis, resolveEmojisByName };
