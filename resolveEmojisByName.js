// resolveEmojisByName.js
// Resolves emoji IDs for builder exports.
// 1) Checks the current guild's custom emojis by *name*
// 2) Falls back to application-level/static mapping below (edit as needed)

/**
 * Static mapping for Application Emojis or any IDs you want to force.
 * Add here: name: "emoji_id"
 */
const APPLICATION_EMOJIS = {
  // Example (из твоего Dev Portal):
  back_purp: "1416710042002128926",
  // Добавляй остальные по аналогии:
  // user_2_mix: "000000000000000000",
  // handshake_mix: "000000000000000000",
};

/**
 * @param {import('discord.js').Guild} guild
 * @param {string[]} names - emoji names referenced in the export
 * @returns {Promise<{nameToId: Record<string,string>, missing: string[]}>}
 */
async function resolveEmojisByName(guild, names) {
  const nameToId = {};
  const missing = [];

  // Try guild emojis first
  let coll = null;
  if (guild) {
    try {
      coll = await guild.emojis.fetch();
    } catch {
      coll = guild.emojis?.cache ?? null;
    }
  }

  for (const n of names) {
    let id = null;

    // 1) Guild emoji by name
    if (coll) {
      const found = coll.find(e => e.name === n);
      if (found) id = found.id;
    }

    // 2) Fallback: application/static map
    if (!id && APPLICATION_EMOJIS[n]) {
      id = APPLICATION_EMOJIS[n];
    }

    if (id) {
      nameToId[n] = id;
    } else {
      missing.push(n);
    }
  }

  return { nameToId, missing };
}

module.exports = { resolveEmojisByName, APPLICATION_EMOJIS };
