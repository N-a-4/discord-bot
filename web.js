// web.js — registers both /rustify and /appemojis and exposes /health
require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const Registry = require('./fs-registry');
const { loadApplicationEmojis } = require('./resolveEmojisByName');
const embedImportRoute = require('./routes/embedImport');

const app = express();
app.use('/api', embedImportRoute);
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/exports', (_req, res) => res.json({ exports: Registry.list() }));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Commands
const rustify = require('./commands/rustify');
const appemojis = require('./commands/emojis');
const reloadEmbeds = require('./commands/reload_embeds'); // <-- added
client.commands = new Collection();
client.commands.set(rustify.data.name, rustify);
client.commands.set(appemojis.data.name, appemojis);
client.commands.set(reloadEmbeds.data.name, reloadEmbeds); // <-- added

async function registerSlash() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const data = [rustify.data.toJSON(), appemojis.data.toJSON(), reloadEmbeds.data.toJSON()]; // <-- added
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

// ---- Robust HTTP start with port retry if EADDRINUSE ----
function startHttpWithRetry(preferredPort, attempts = 5) {
  return new Promise((resolve, reject) => {
    const tryListen = (port, left) => {
      const server = app.listen(port, () => {
        console.log('[http] listening on', port);
        resolve(server);
      });
      server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE' && left > 0) {
          const next = port + 1;
          console.warn(`[http] port ${port} in use, retrying on ${next} (left: ${left - 1})`);
          setTimeout(() => tryListen(next, left - 1), 150);
        } else {
          console.error('[http] listen error:', err);
          reject(err);
        }
      });
    };
    tryListen(preferredPort, attempts);
  });
}

(async () => {
  const preferred = Number(process.env.PORT) || 3000;
  await startHttpWithRetry(preferred, 9); // try up to 10 ports: preferred..preferred+9
  await registerSlash();
  await client.login(process.env.DISCORD_TOKEN);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
