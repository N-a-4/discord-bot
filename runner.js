// fs-ingest/runner.js
// Execute exported CV2 code inside an async function so top-level `await` works.
// Also forwards Discord builders & enums to the sandboxed function.

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

// Build AsyncFunction constructor
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function makeEmojiMap(nameToId = {}) {
  const map = {};
  for (const [name, id] of Object.entries(nameToId)) {
    map[name] = {
      id,
      name,
      toString() {
        return id ? `<:${name}:${id}>` : name;
      },
    };
  }
  return map;
}

/**
 * Execute a piece of JS that was exported by the Embed Builder.
 * The code may contain top-level await; we run it inside AsyncFunction.
 *
 * @param {string} code - The exported JS source
 * @param {import('discord.js').Interaction} interaction - Discord interaction
 * @param {Record<string,string>} nameToId - emoji-name → id map
 */
async function runExportJS(code, interaction, nameToId) {
  const emojis = makeEmojiMap(nameToId);

  // Compose function *body*; top-level code will run in async context.
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
    // Surface a clearer error to the caller
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
    // Let the caller decide how to render this
    const msg = runtimeErr?.message || String(runtimeErr);
    const err = new Error(`[runner] Runtime error: ${msg}`);
    err.cause = runtimeErr;
    throw err;
  }
}

module.exports = { runExportJS };
