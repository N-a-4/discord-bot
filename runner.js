// fs-ingest/runner.js
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

function makeEmojiMap(nameToId) {
  const map = {};
  for (const [name, id] of Object.entries(nameToId)) {
    map[name] = {
      id, name,
      toString() { return id ? `<:${name}:${id}>` : name; }
    };
  }
  return map;
}

async function runExportJS(code, interaction, nameToId) {
  const emojis = makeEmojiMap(nameToId);
  const fn = new Function(
    'interaction','emojis',
    'ContainerBuilder','MediaGalleryItemBuilder','SeparatorSpacingSize',
    'ActionRowBuilder','ButtonBuilder','StringSelectMenuBuilder','ButtonStyle',
    'MessageFlags',
    `"use strict";\n${code}\n`
  );
  await fn(
    interaction, emojis,
    ContainerBuilder, MediaGalleryItemBuilder, SeparatorSpacingSize,
    ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ButtonStyle,
    MessageFlags
  );
}

module.exports = { runExportJS };