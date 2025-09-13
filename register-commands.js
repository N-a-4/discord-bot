import 'dotenv/config';
import { REST, Routes } from 'discord.js';
const token = process.env.DISCORD_TOKEN;
const appId = process.env.APPLICATION_ID;
const guildId = process.env.GUILD_ID;
if (!token || !appId || !guildId) { console.error('Missing DISCORD_TOKEN / APPLICATION_ID / GUILD_ID in .env'); process.exit(1); }
const commands = [{
  name: 'rustify',
  description: 'Открыть навигационные страницы (Components V2)',
  options: [{ name: 'page', description: 'Стартовая страница (id/slug)', type: 3, required: false }]
}];
const rest = new REST({ version: '10' }).setToken(token);
try { await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: commands }); console.log('Registered slash commands to guild', guildId); }
catch (e) { console.error('Failed to register commands', e.rawError ?? e); }