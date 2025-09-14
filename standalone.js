// fs-ingest/standalone.js
require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const path = require('path');
const fs = require('fs');
const Registry = require('./fs-registry');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const rustify = require('./commands/rustify');
client.commands = new Collection();
client.commands.set(rustify.data.name, rustify);

async function registerSlash() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const data = [rustify.data.toJSON()];
  const route = process.env.GUILD_ID
    ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
    : Routes.applicationCommands(process.env.CLIENT_ID);
  await rest.put(route, { body: data });
  console.log('[slash] Registered to', process.env.GUILD_ID || 'GLOBAL');
}

client.on('ready', () => {
  console.log(`[bot] Logged in as ${client.user.tag}`);
  const list = Registry.list();
  console.log('[exports] found:', list.length ? list.join(', ') : '(none)');
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
  await registerSlash();
  await client.login(process.env.DISCORD_TOKEN);
})().catch(err => {
  console.error(err);
  process.exit(1);
});