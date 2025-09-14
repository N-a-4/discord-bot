// standalone.js — same as web.js but without HTTP server
require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const Registry = require('./fs-registry');
const { loadApplicationEmojis } = require('./resolveEmojisByName');

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
  await registerSlash();
  await client.login(process.env.DISCORD_TOKEN);
})().catch(err => {
  console.error(err);
  process.exit(1);
});