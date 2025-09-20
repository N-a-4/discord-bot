// fs-ingest/fs-registry.js
// Loads exported "Components" JS files from ./exports at startup.
const fs = require('fs');
const path = require('path');

const EXPORTS_DIR = process.env.EXPORTS_DIR || path.resolve(process.cwd(), 'exports');

/** @type {Map<string, {name:string, code:string, file:string, mtime:number}>} */
const Registry = new Map();

function scanExports() {
  if (!fs.existsSync(EXPORTS_DIR)) return;
  const files = fs.readdirSync(EXPORTS_DIR).filter(f => f.endsWith('.js'));
  for (const f of files) {
    const full = path.join(EXPORTS_DIR, f);
    const stat = fs.statSync(full);
    const name = path.basename(f, '.js'); // filename w/o extension
    const code = fs.readFileSync(full, 'utf8');
    Registry.set(name, { name, code, file: full, mtime: +stat.mtime });
  }
}

function list() {
  if (!Registry.size) scanExports();
  return Array.from(Registry.keys()).sort();
}

function get(name) {
  if (!Registry.size) scanExports();
  return Registry.get(name) || null;
}

module.exports = { list, get, EXPORTS_DIR, scanExports };