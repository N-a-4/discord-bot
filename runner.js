// runner.js
const {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  ButtonStyle,
  MessageFlags,
  ContainerBuilder,
  MediaGalleryItemBuilder,
  SeparatorSpacingSize,
} = require('discord.js');

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function makeEmojiMap(nameToMeta = {}) {
  const map = {};
  for (const [name, meta] of Object.entries(nameToMeta)) {
    const id = typeof meta === 'string' ? meta : meta?.id;
    const animated = typeof meta === 'object' ? !!meta.animated : false;
    map[name] = {
      id,
      animated,
      name,
      toString() {
        if (!id) return name;
        const prefix = animated ? 'a' : '';
        return `<${prefix}:${name}:${id}>`;
      },
    };
  }
  return map;
}

async function runExportJS(code, interaction, emojiMap) {
  const emojis = makeEmojiMap(emojiMap || {});
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
      'MessageFlags',
      body
    );
  } catch (compileErr) {
    const msg = compileErr?.message || String(compileErr);
    throw new Error(`[runner] Failed to compile exported code: ${msg}`);
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
    const msg = runtimeErr?.message || String(runtimeErr);
    const err = new Error(`[runner] Runtime error: ${msg}`);
    err.cause = runtimeErr;
    throw err;
  }
}

module.exports = { runExportJS };
