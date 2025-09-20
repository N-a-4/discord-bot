// web.js — stable slash registration (robust .toJSON handling) + http server + routes
require('dotenv').config();

const express = require('express');
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');

const Registry = require('./fs-registry');
const { loadApplicationEmojis } = require('./resolveEmojisByName');
const embedImportRoute = require('./routes/embedImport');

// ---- HTTP ---------------------------------------------------------------
const app = express();
app.use('/api', embedImportRoute);
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/exports', (_req, res) => res.json({ exports: Registry.list() }));

// ---- Discord client -----------------------------------------------------
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Commands
const rustify = require('./commands/rustify');
const appemojis = require('./commands/emojis');
const reloadEmbeds = require('./commands/reload_embeds'); // confirmed SlashCommandBuilder in your project

client.commands = new Collection();
client.commands.set(rustify.data?.name ?? rustify.name, rustify);
client.commands.set(appemojis.data?.name ?? appemojis.name, appemojis);
client.commands.set(reloadEmbeds.data?.name ?? reloadEmbeds.name ?? 'reload_embeds', reloadEmbeds);

// Helper: converts SlashCommandBuilder or plain object to JSON expected by REST
function toJSONSafe(cmd) {
  const data = cmd?.data ?? cmd;
  return typeof data?.toJSON === 'function' ? data.toJSON() : data;
}

// Register slash commands (guild or global)
async function registerSlash() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const body = [rustify, appemojis, reloadEmbeds].map(toJSONSafe);

  const route = process.env.GUILD_ID
    ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
    : Routes.applicationCommands(process.env.CLIENT_ID);

  await rest.put(route, { body });
  console.log('[slash] registered', body.length, 'commands to', process.env.GUILD_ID || 'GLOBAL');
}

// Diagnostics
client.on('ready', async () => {
  console.log(`[bot] Logged in as ${client.user.tag}`);
  try {
    const map = await loadApplicationEmojis();
    console.log('[emojis] preloaded', Object.keys(map).length);
  } catch {}
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd?.execute) await cmd.execute(interaction);
  } else if (interaction.isAutocomplete()) {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd?.autocomplete) await cmd.autocomplete(interaction);
  }
});

// HTTP start with simple retry on EADDRINUSE
function startHttpWithRetry(port, attempts = 5) {
  return new Promise((resolve, reject) => {
    const tryListen = (p, left) => {
      const server = app.listen(p, () => {
        console.log('[http] listening on', p);
        resolve(server);
      });
      server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE' && left > 0) {
          const next = p + 1;
          console.warn(`[http] port ${p} busy, retry ${next} (left: ${left - 1})`);
          setTimeout(() => tryListen(next, left - 1), 200);
        } else {
          console.error('[http] listen error:', err);
          reject(err);
        }
      });
    };
    tryListen(port, attempts);
  });
}

(async () => {
  const port = Number(process.env.PORT) || 3000;
  await startHttpWithRetry(port, 8);
  await registerSlash();
  await client.login(process.env.DISCORD_TOKEN);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
