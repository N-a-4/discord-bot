// collectEmojiNames.js — patched to capture bracket notation (incl. names starting with digits)
function collectEmojiNamesFromCode(code) {
  if (!code || typeof code !== 'string') return [];

  const names = new Set();
  const add = (v) => { if (v) names.add(String(v)); };

  // 1) emojis.foo.id  — dot notation (only valid JS identifiers; won't match leading digits, and that's OK)
  const rDotId = /(?:^|[^\$])emojis\.([A-Za-z_][A-Za-z0-9_]*)\.id\b/g;

  // 2) emojis["name"].id / emojis['name'].id / emojis[`name`].id — bracket + .id
  const rBracketId = /emojis\[\s*["'`]([^"'`]+)["'`]\s*\]\.id\b/g;

  // 3) ${emojis.foo} — template literal with dot notation
  const rTplDot = /\$\{\s*emojis\.([A-Za-z_][A-Za-z0-9_]*)\s*\}/g;

  // 4) emojis["name"] — bracket notation WITHOUT .id (e.g., emojis['24hours'])
  const rBracket = /emojis\[\s*["'`]([^"'`]+)["'`]\s*\](?!\s*\.id)/g;

  // 5) ${emojis["name"]} — bracket notation inside template literal
  const rTplBracket = /\$\{\s*emojis\[\s*["'`]([^"'`]+)["'`]\s*\]\s*\}/g;

  let m;
  while ((m = rDotId.exec(code))) add(m[1]);
  while ((m = rBracketId.exec(code))) add(m[1]);
  while ((m = rTplDot.exec(code))) add(m[1]);
  while ((m = rBracket.exec(code))) add(m[1]);
  while ((m = rTplBracket.exec(code))) add(m[1]);

  return Array.from(names);
}

module.exports = { collectEmojiNamesFromCode };
