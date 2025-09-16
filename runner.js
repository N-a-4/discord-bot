// runner_flags_guard_1a.js
// Safe runner for executing exported Components V2 code (discord.js v14.22+ recommended)
const djs = require('discord.js');

// Provide a safe MessageFlags so generated code can always reference IsComponentsV2.
// If not present (older discord.js), we add a no-op 0 value.
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

/**
 * Build a plain { [name]: { id, animated } } map from user-provided emoji map.
 * The exported code expects `emojis.someName.id` access and `${emojis.someName}` in strings.
 */
function makeEmojiMap(nameToMeta = {}) {
  const map = {};
  for (const [name, meta] of Object.entries(nameToMeta || {})) {
    if (!meta) continue;
    const id = typeof meta.id === 'string' || typeof meta.id === 'number' ? String(meta.id) : null;
    if (!id) continue;
    map[name] = { id, animated: !!meta.animated };
  }
  return map;
}

/**
 * Execute the exported code with an injected scope that matches what the exporter generates.
 * @param {string} code - Generated JS/TS-like string from exporter v2
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 * @param {{[name:string]: {id:string, animated?:boolean}}} emojis
 */
async function runExportJS(code, interaction, emojis = {}) {
  if (!code || typeof code !== 'string') {
    throw new Error('[runner] No code provided to runExportJS');
  }

  // The exported code will call interaction.deferReply()/editReply() itself.
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
  } catch (runtimeErr) {
    const msg = runtimeErr?.message || String(runtimeErr);
    const err = new Error(`[runner] Runtime error: ${msg}`);
    err.cause = runtimeErr;
    throw err;
  }
}

module.exports = { runExportJS };
