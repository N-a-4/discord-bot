// scripts/print-app-emojis.js
require('dotenv').config();
const { loadApplicationEmojis } = require('../resolveEmojisByName');

(async () => {
  const map = await loadApplicationEmojis();
  const names = Object.keys(map).sort();
  console.log('Total:', names.length);
  console.log('Sample:', names.slice(0, 50));
})().catch(console.error);