// fs-ingest/resolveEmojisByName.js
async function resolveEmojisByName(guild, names) {
  if (!guild) throw new Error('This command must be used in a guild');
  const coll = await guild.emojis.fetch().catch(() => guild.emojis.cache);
  const nameToId = {};
  const missing = [];
  for (const n of names) {
    const found = coll?.find(e => e.name === n);
    if (found) nameToId[n] = found.id;
    else missing.push(n);
  }
  return { nameToId, missing };
}
module.exports = { resolveEmojisByName };