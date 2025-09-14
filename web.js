// web.js — registers both /rustify and /appemojis and exposes /health
require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const Registry = require('./fs-registry');
const { loadApplicationEmojis } = require('./resolveEmojisByName');

const app = express();
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/exports', (_req, res) => res.json({ exports: Registry.list() }));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Commands
const rustify = require('./commands/rustify');
const appemojis = require('./commands/emojis');
client.commands = new Collection();
client.commands.set(rustify.data.name, rustify);
client.commands.set(appemojis.data.name, appemojis);

async function registerSlash() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const data = [rustify.data.toJSON(), appemojis.data.toJSON()];
  const route = process.env.GUILD_ID
    ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
    : Routes.applicationCommands(process.env.CLIENT_ID);
  await rest.put(route, { body: data });
  console.log('[slash] Registered to', process.env.GUILD_ID || 'GLOBAL', 'count=', data.length);
}

client.on('ready', async () => {
  console.log(`[bot] Logged in as ${client.user.tag}`);
  console.log('[exports]', Registry.list());
  // Preload application emojis for diagnostics
  try {
    const map = await loadApplicationEmojis();
    console.log('[emojis] Preloaded app emojis:', Object.keys(map).length);
  } catch {}
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd) await cmd.execute(interaction);
  } else if (interaction.isAutocomplete()) {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd?.autocomplete) await cmd.autocomplete(interaction);
  }
});

(async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('[http] listening on', port));
  await registerSlash();
  await client.login(process.env.DISCORD_TOKEN);
})().catch(err => {
  console.error(err);
  process.exit(1);
});