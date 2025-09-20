// routes/embedImport.js
// Webhook endpoint to receive exported embed code from the Builder and save it into exports/incoming/
// Security: requires header "x-embed-token" matching process.env.EMBED_IMPORT_TOKEN
// CORS: allow configured origin (EMBED_CORS_ORIGIN) or "*" in dev

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// CORS (keep it route-local so we don't affect other routes)
router.use((req, res, next) => {
  const origin = process.env.EMBED_CORS_ORIGIN || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-embed-token');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

router.post('/embed/import', express.json({ limit: '2mb' }), (req, res) => {
  try {
    const token = req.get('x-embed-token');
    if (!process.env.EMBED_IMPORT_TOKEN) {
      return res.status(500).json({ ok: false, error: 'Server missing EMBED_IMPORT_TOKEN' });
    }
    if (token !== process.env.EMBED_IMPORT_TOKEN) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    const { filename, code, projectId, embedId, notifyUserId } = req.body || {};
    if (!filename || !code) {
      return res.status(400).json({ ok: false, error: 'filename and code are required' });
    }

    // sanitize filename
    const safeName = String(filename).replace(/[^a-z0-9._-]/gi, '_');
    const outDir = path.join(__dirname, '..', 'exports', 'incoming');
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, safeName);

    fs.writeFileSync(outPath, code, 'utf8');

    // Optionally: attach a small meta json next to the file
    const meta = { projectId: projectId || null, embedId: embedId || null, at: new Date().toISOString(), by: notifyUserId || null };
    fs.writeFileSync(outPath + '.meta.json', JSON.stringify(meta, null, 2), 'utf8');

    return res.json({ ok: true, saved: path.relative(path.join(__dirname, '..'), outPath) });
  } catch (err) {
    console.error('embed/import error:', err);
    return res.status(500).json({ ok: false, error: String(err && err.message || err) });
  }
});

module.exports = router;
