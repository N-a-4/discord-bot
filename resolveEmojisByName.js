
// resolveEmojisByName.js — fetch Application Emojis via HTTPS (bypass discord.js REST)
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
  if (!token || !appId) return {};

  const url = `https://discord.com/api/v10/applications/${appId}/emojis`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bot ${token}`,
      'User-Agent': 'DiscordBot (app-emojis, 1.0)',
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    let txt = await res.text().catch(()=>'');
    log('HTTP error', res.status, res.statusText, txt.slice(0,200));
    return {};
  }

  const body = await res.json().catch(()=>({}));
  const arr = normalize(body);
  const map = {};
  for (const e of arr) if (e?.name && e?.id) map[e.name] = e.id;
  log('Fetched application emojis via fetch():', Object.keys(map).length);
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

async function resolveEmojisByName(_ignored, names) {
  const map = await getEmojiMap();
  const nameToId = {};
  const missing = [];
  for (const n of names) {
    const id = map[n] || null;
    if (id) nameToId[n] = id; else missing.push(n);
  }
  if (missing.length) log('Missing names:', missing.join(', '));
  return { nameToId, missing };
}

module.exports = { resolveEmojisByName, loadApplicationEmojis: getEmojiMap };
