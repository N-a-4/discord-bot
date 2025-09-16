// runner.fix_1a.js
const {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  ButtonStyle,
  MessageFlags,
  ContainerBuilder,
  MediaGalleryItemBuilder,
  SeparatorSpacingSize,
  DiscordAPIError,
} = require('discord.js');

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function makeEmojisProxy(nameToMeta = {}) {
  const map = Object.create(null);
  for (const [name, meta] of Object.entries(nameToMeta || {})) {
    map[name] = { id: meta?.id || null, animated: !!meta?.animated };
  }
  return new Proxy(map, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      const meta = target[prop] || { id: null, animated: false };
      const o = { id: meta.id, animated: !!meta.animated };
      Object.defineProperty(o, 'toString', {
        value: () => (meta.id ? `<${meta.animated ? 'a' : ''}:${prop}:${meta.id}>` : `:${prop}:`),
        enumerable: false,
      });
      return o;
    }
  });
}

function formatDiscordError(e) {
  // Capture DiscordAPIError structure if present
  const base = e && e.message ? e.message : String(e);
  const extra = (e && typeof e === 'object' && e.rawError) ? e.rawError : null;
  if (extra && extra.errors) {
    try {
      return base + ' | details: ' + JSON.stringify(extra.errors);
    } catch {
      return base;
    }
  }
  return base;
}

async function runExportJS(code, interaction, nameToMeta) {
  const emojis = makeEmojisProxy(nameToMeta || {});
  const body = `"use strict";\n${code}\n`;

  let fn;
  try {
    fn = new AsyncFunction(
      'interaction',
      'emojis',
      'ContainerBuilder',
      'MediaGalleryItemBuilder',
      'SeparatorSpacingSize',
      'ActionRowBuilder',
      'ButtonBuilder',
      'StringSelectMenuBuilder',
      'ButtonStyle',
      'MessageFlags'
    );
  } catch (compileErr) {
    const err = new Error('[runner] Compile error: ' + (compileErr?.message || String(compileErr)));
    err.cause = compileErr;
    throw err;
  }

  try {
    await fn(
      interaction,
      emojis,
      ContainerBuilder,
      MediaGalleryItemBuilder,
      SeparatorSpacingSize,
      ActionRowBuilder,
      ButtonBuilder,
      StringSelectMenuBuilder,
      ButtonStyle,
      MessageFlags
    );
  } catch (runtimeErr) {
    const msg = formatDiscordError(runtimeErr);
    const err = new Error('[runner] Runtime error: ' + msg);
    err.cause = runtimeErr;
    throw err;
  }
}

module.exports = { runExportJS };