// routes/embedImport.js
// Receives exported embed code from the Builder and saves it into exports/incoming/
// Security: x-embed-token or Authorization: Bearer <token> must match EMBED_IMPORT_TOKEN
// CORS: EMBED_CORS_ORIGIN or "*" (dev). Optional auto-reload via Registry.reloadEmbeds().

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// local JSON body parser (limit 5mb)
router.use(express.json({ limit: '5mb' }));

// route-local CORS
router.use((req, res, next) => {
  const allow = process.env.EMBED_CORS_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-embed-token');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

function extractToken(req) {
  const hdr = req.headers['authorization'];
  if (hdr && /^Bearer\s+/i.test(hdr)) return hdr.replace(/^Bearer\s+/i, '').trim();
  const x = req.headers['x-embed-token'];
  if (x) return String(x).trim();
  return null;
}

router.post('/exports/import', async (req, res) => {
  try {
    const requiredToken = process.env.EMBED_IMPORT_TOKEN;
    if (!requiredToken) return res.status(500).json({ ok: false, error: 'Server misconfigured: no EMBED_IMPORT_TOKEN' });

    const token = extractToken(req);
    if (!token || token !== requiredToken) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    const { filename, code, projectId, embedId, notifyUserId } = req.body || {};
    if (!filename || !code) {
      return res.status(400).json({ ok: false, error: 'filename and code are required' });
    }

    const safeName = String(filename).replace(/[^a-z0-9._-]/gi, '_');
    const incomingDir = path.join(__dirname, '..', 'exports', 'incoming');
    fs.mkdirSync(incomingDir, { recursive: true });
    const filePath = path.join(incomingDir, safeName);

    fs.writeFileSync(filePath, code, 'utf8');

    const meta = {
      projectId: projectId ?? null,
      embedId: embedId ?? null,
      by: notifyUserId ?? null,
      at: new Date().toISOString(),
    };
    fs.writeFileSync(filePath + '.meta.json', JSON.stringify(meta, null, 2), 'utf8');

    // optional reload
    let reloaded = false, reloadError = null;
    const shouldReload = String((req.query.reload ?? '1')).toLowerCase() !== '0';
    if (shouldReload) {
      try {
        const Registry = require('../fs-registry');
        if (Registry && typeof Registry.reloadEmbeds === 'function') {
          await Promise.resolve(Registry.reloadEmbeds());
          reloaded = true;
        }
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
