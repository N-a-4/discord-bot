// runner_cv2_full_1c.js
// Hardened runner for Components V2 exports with emoji .toString() for inline usage.
// Requires discord.js >= 14.22.x for full CV2 support.
const djs = require('discord.js');

// Build a safe MessageFlags so code can always reference IsComponentsV2, even on older libs.
const SafeMessageFlags = (() => {
  const orig = djs.MessageFlags || {};
  if (Object.prototype.hasOwnProperty.call(orig, 'IsComponentsV2')) return orig;
  return Object.assign({}, orig, { IsComponentsV2: 0 });
})();

const {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  ButtonStyle,
  ContainerBuilder,
  MediaGalleryItemBuilder,
  SeparatorSpacingSize,
} = djs;

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function makeEmojiMap(nameToMeta = {}) {
  const map = {};
  for (const [name, meta] of Object.entries(nameToMeta || {})) {
    if (!meta) continue;
    const id = typeof meta.id === 'string' || typeof meta.id === 'number' ? String(meta.id) : null;
    if (!id) continue;
    const animated = !!meta.animated;
    const obj = {
      id,
      animated,
      // When used inside template strings `${emojis.some}` -> prints as <:name:id> or <a:name:id>
      toString() {
        return `<${this.animated ? 'a:' : ':'}${name}:${this.id}>`;
      },
    };
    map[name] = obj;
  }
  return map;
}

/**
 * Execute exported CV2 code with all necessary injections.
 * @param {string} code
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 * @param {{[name:string]: {id:string, animated?:boolean}}} emojis
 */
async function runExportJS(code, interaction, emojis = {}) {
  if (!code || typeof code !== 'string') {
    throw new Error('[runner] No code provided to runExportJS');
  }

  const emojiMap = makeEmojiMap(emojis);

  const fn = new AsyncFunction(
    'interaction',
    'emojis',
    'ActionRowBuilder',
    'ButtonBuilder',
    'StringSelectMenuBuilder',
    'ButtonStyle',
    'MessageFlags',
    'ContainerBuilder',
    'MediaGalleryItemBuilder',
    'SeparatorSpacingSize',
    code
  );

  try {
    await fn(
      interaction,
      emojiMap,
      ActionRowBuilder,
      ButtonBuilder,
      StringSelectMenuBuilder,
      ButtonStyle,
      SafeMessageFlags,
      ContainerBuilder,
      MediaGalleryItemBuilder,
      SeparatorSpacingSize
    );
  } catch (e) {
    // Try to expose discord.js REST error details to help debugging
    let extra = '';
    if (e && typeof e === 'object') {
      const raw = e.rawError || e.response?.data || e.data || null;
      if (raw) {
        try { extra = '\nrawError: ' + JSON.stringify(raw).slice(0, 1200); } catch {}
      }
      if (e.requestBody) {
        try { extra += '\nrequestBody: ' + JSON.stringify(e.requestBody).slice(0, 1200); } catch {}
      }
      if (e.requestData) {
        try { extra += '\nrequestData: ' + JSON.stringify(e.requestData).slice(0, 1200); } catch {}
      }
      if (e.stack) {
        extra += '\nstack: ' + String(e.stack).split('\n').slice(0, 6).join('\n');
      }
    }
    const msg = (e?.message || String(e)) + extra;
    const err = new Error('[runner] Runtime error: ' + msg);
    err.cause = e;
    throw err;
  }
}

module.exports = { runExportJS };
