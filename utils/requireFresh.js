// utils/requireFresh.js
const path = require('path');

function requireFresh(modPath) {
  const resolved = require.resolve(modPath);
  if (require.cache[resolved]) {
    delete require.cache[resolved];
  }
  return require(resolved);
}

module.exports = { requireFresh };
