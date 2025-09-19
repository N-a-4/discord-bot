// routes/embedImport.js
// Receives exported embed code from the Builder and saves it into exports/incoming/
// Security via x-embed-token header (must match EMBED_IMPORT_TOKEN)
// CORS is restricted by EMBED_CORS_ORIGIN (or * in dev)
// Optional auto-reload: ?reload=1 (default) loads the saved file with requireFresh()

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { requireFresh } = require('../utils/requireFresh');

// ---- CORS (route-local) ----
router.use((req, res, next) => {
  const origin = process.env.EMBED_CORS_ORIGIN || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-embed-token');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ---- Import endpoint ----
router.post('/embed/import', express.json({ limit: '5mb' }), async (req, res) => {
  try {
    const token = req.get('x-embed-token');
    if (!process.env.EMBED_IMPORT_TOKEN) {
      return res.status(500).json({ ok: false, error: 'Server missing EMBED_IMPORT_TOKEN' });
    }
    if (token !== process.env.EMBED_IMPORT_TOKEN) {
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }

    const { filename, code, projectId, embedId, notifyUserId } = req.body || {};
    if (!filename || typeof filename !== 'string' || !code || typeof code !== 'string') {
      return res.status(400).json({ ok: false, error: 'filename and code are required' });
    }

    // sanitize filename
    const safeName = filename.replace(/[^a-z0-9._-]/gi, '_');
    const incomingDir = path.join(__dirname, '..', 'exports', 'incoming');
    fs.mkdirSync(incomingDir, { recursive: true });
    const filePath = path.join(incomingDir, safeName);

    // write code file
    fs.writeFileSync(filePath, code, 'utf8');

    // write meta next to it (optional, helps debugging)
    const meta = {
      projectId: projectId ?? null,
      embedId: embedId ?? null,
      by: notifyUserId ?? null,
      at: new Date().toISOString()
    };
    fs.writeFileSync(filePath + '.meta.json', JSON.stringify(meta, null, 2), 'utf8');

    // optional auto reload (default on) - can be disabled with ?reload=0
    const shouldReload = String(req.query.reload ?? '1') !== '0';
    let reloaded = false, reloadError = null;
    if (shouldReload) {
      try {
        requireFresh(filePath);
        reloaded = true;
      } catch (e) {
        reloadError = String(e && e.message || e);
      }
    }

    const savedRel = path.relative(path.join(__dirname, '..'), filePath);
    return res.json({ ok: true, saved: savedRel, reloaded, reloadError });
  } catch (err) {
    console.error('[embedImport] error', err);
    return res.status(500).json({ ok: false, error: String(err && err.message || err) });
  }
});

module.exports = router;
