// collectEmojiNames.fix_1b.js
// Extract emoji names referenced in exported embed code.
function collectEmojiNamesFromCode(code) {
  const names = new Set();

  // emojis.name.id
  const r1 = /emojis\.([a-zA-Z0-9_]+)\.id/g;

  // emojis['name'].id  |  emojis["name"].id  |  emojis[`name`].id
  const r2 = /emojis\[\s*["'`]([^"'`]+)["'`]\s*\]\.id/g;

  // `${emojis.name}`
  const r3 = /emojis\.([a-zA-Z0-9_]+)\}/g;

  // `${emojis['name']}`  |  `${emojis["name"]}`  |  `${emojis[`name`]}`
  const r4 = /emojis\[\s*["'`]([^"'`]+)["'`]\s*\]\}/g;

  let m;
  while ((m = r1.exec(code))) names.add(m[1]);
  while ((m = r2.exec(code))) names.add(m[1]);
  while ((m = r3.exec(code))) names.add(m[1]);
  while ((m = r4.exec(code))) names.add(m[1]);

  return Array.from(names);
}

module.exports = { collectEmojiNamesFromCode };
