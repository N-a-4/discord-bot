// runner.fix_1c.js — SAFE_1C (banner) + safe builders + diagnostics
console.log('[runner] SAFE_1C loaded');

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

// ---- Safe wrappers ----
class SafeButtonBuilder extends ButtonBuilder {
  setEmoji(e) {
    try {
      if (!e || !e.id) return this;
      return super.setEmoji(e);
    } catch {
      return this;
    }
  }
}

class SafeStringSelectMenuBuilder extends StringSelectMenuBuilder {
  addOptions(...args) {
    try {
      const flat = [];
      for (const a of args) {
        if (Array.isArray(a)) flat.push(...a);
        else flat.push(a);
      }
      const cleaned = flat.map(o => {
        if (!o || typeof o !== 'object') return o;
        const c = { ...o };
        if (c.emoji && (!c.emoji.id)) delete c.emoji;
        return c;
      });
      return super.addOptions(cleaned);
    } catch {
      return super.addOptions(...args);
    }
  }
}

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
  try {
    const base = e && e.message ? e.message : String(e);
    const raw = e && e.rawError ? e.rawError : null;
    if (raw && raw.errors) {
      return base + ' | details: ' + JSON.stringify(raw.errors);
    }
    return base;
  } catch {
    return String(e);
  }
}

async function runExportJS(code, interaction, nameToMeta) {
  const emojis = makeEmojisProxy(nameToMeta || {});

  // Use safe builders consistently
  const _ActionRowBuilder = ActionRowBuilder;
  const _ButtonBuilder = SafeButtonBuilder;
  const _StringSelectMenuBuilder = SafeStringSelectMenuBuilder;

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
      _ActionRowBuilder,
      _ButtonBuilder,
      _StringSelectMenuBuilder,
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