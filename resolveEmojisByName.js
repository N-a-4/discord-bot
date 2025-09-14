// resolveEmojisByName.js
// Resolve emoji IDs by name for builder exports.
// 1) Try guild custom emojis by *name*
// 2) Fallback to Application Emojis (global, uploaded to the app) via REST
//    Endpoint: GET /applications/{application.id}/emojis
// Caches application emoji map in memory.

const { REST } = require('discord.js');

let _appEmojiMap = null; // { name: id }
let _appEmojiLoadPromise = null;

/** Load & cache Application Emojis (name -> id) using REST and env vars. */
async function loadApplicationEmojis() {
  if (_appEmojiMap) return _appEmojiMap;
  if (_appEmojiLoadPromise) return _appEmojiLoadPromise;

  const token = process.env.DISCORD_TOKEN;
  const appId = process.env.CLIENT_ID;
  if (!token || !appId) {
    console.warn('[emojis] DISCORD_TOKEN or CLIENT_ID is missing; cannot fetch application emojis');
    _appEmojiMap = {};
    return _appEmojiMap;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  _appEmojiLoadPromise = (async () => {
    try {
      // Discord HTTP route for application emojis.
      // Using raw path to avoid version drift; discord.js REST accepts absolute/relative paths.
      const list = await rest.get(`/applications/${appId}/emojis`);
      const map = {};
      for (const e of list || []) {
        if (e?.name && e?.id) map[e.name] = e.id;
      }
      _appEmojiMap = map;
      console.log('[emojis] Loaded application emojis:', Object.keys(map).length);
      return _appEmojiMap;
    } catch (err) {
      console.error('[emojis] Failed to load application emojis:', err?.message || err);
      _appEmojiMap = {};
      return _appEmojiMap;
    } finally {
      _appEmojiLoadPromise = null;
    }
  })();

  return _appEmojiLoadPromise;
}

/**
 * @param {import('discord.js').Guild | null} guild
 * @param {string[]} names - emoji names referenced in the export
 * @returns {Promise<{nameToId: Record<string,string>, missing: string[]}>}
 */
async function resolveEmojisByName(guild, names) {
  const nameToId = {};
  const missing = [];

  // 1) Try guild emojis (if any)
  let coll = null;
  if (guild) {
    try {
      coll = await guild.emojis.fetch();
    } catch {
      coll = guild.emojis?.cache ?? null;
    }
  }

  // 2) Ensure application emojis are loaded
  const appMap = await loadApplicationEmojis();

  for (const n of names) {
    let id = null;

    // guild by name
    if (coll) {
      const found = coll.find(e => e.name === n);
      if (found) id = found.id;
    }

    // app-level by name
    if (!id && appMap && appMap[n]) {
      id = appMap[n];
    }

    if (id) nameToId[n] = id;
    else missing.push(n);
  }

  return { nameToId, missing };
}

module.exports = { resolveEmojisByName, loadApplicationEmojis };
