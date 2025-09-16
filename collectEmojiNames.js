// fs-ingest/collectEmojiNames.js
function collectEmojiNamesFromCode(code) {
  const names = new Set();
  const r1 = /emojis\.([a-zA-Z0-9_]+)\.id/g;
  const r2 = /emojis\[\s*["'`]([^"'`]+)["'`]\s*\]\.id/g;
  const r3 = /emojis\.([a-zA-Z0-9_]+)\}/g; // `${emojis.name}`
  let m;
  while ((m = r1.exec(code))) names.add(m[1]);
  while ((m = r2.exec(code))) names.add(m[1]);
  while ((m = r3.exec(code))) names.add(m[1]);
  return Array.from(names);
}
module.exports = { collectEmojiNamesFromCode };