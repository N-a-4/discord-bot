// resolveEmojisByName.js
let _cache = null;
let _loading = null;

function log(...a){ console.log('[emojis]', ...a); }

function normalize(list) {
  if (!list) return [];
  if (Array.isArray(list)) return list;
  if (Array.isArray(list.items)) return list.items;
  if (Array.isArray(list.emojis)) return list.emojis;
  if (Array.isArray(list.data)) return list.data;
  try {
    return Object.values(list).filter(v => v && typeof v === 'object' && ('id' in v || 'name' in v));
  } catch { return []; }
}

async function fetchAppEmojis() {
  const token = process.env.DISCORD_TOKEN;
  const appId = process.env.CLIENT_ID;
  if (!token || !appId) {
    log('Missing DISCORD_TOKEN or CLIENT_ID');
    return {};
  }

  if (typeof fetch !== 'function') {
    log('Global fetch is not available (Node < 18?). Cannot resolve application emojis.');
    return {};
  }

  const url = `https://discord.com/api/v10/applications/${appId}/emojis`;
  let res;
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bot ${token}`,
        'User-Agent': 'DiscordBot (app-emojis, 1.0)',
        'Accept': 'application/json'
      }
    });
  } catch (err) {
    log('Network error while fetching application emojis:', err?.message || err);
    return {};
  }

  if (!res.ok) {
    let txt = '';
    try { txt = await res.text(); } catch {}
    log('HTTP error', res.status, res.statusText, txt.slice(0, 200));
    return {};
  }

  let body = {};
  try { body = await res.json(); } catch {}
  const arr = normalize(body);
  const map = {};
  for (const e of arr) {
    const name = e?.name;
    const id = e?.id;
    if (name && id) {
      map[name] = { id, animated: !!e?.animated };
    }
  }
  log('Fetched application emojis:', Object.keys(map).length);
  return map;
}

async function getEmojiMap() {
  if (_cache) return _cache;
  if (_loading) return _loading;
  _loading = (async () => {
    try {
      const remote = await fetchAppEmojis();
      _cache = remote;
      return _cache;
    } finally {
      _loading = null;
    }
  })();
  return _loading;
}

async function resolveEmojisByName(_ignoredGuild, names) {
  const map = await getEmojiMap();
  const emojiMap = {};
  const missing = [];
  for (const n of names || []) {
    const meta = map[n] || null;
    if (meta?.id) emojiMap[n] = { id: meta.id, animated: !!meta.animated };
    else missing.push(n);
  }
  if (missing.length) log('Missing names:', missing.join(', '));
  return { emojiMap, missing };
}

module.exports = { resolveEmojisByName, loadApplicationEmojis: getEmojiMap };
