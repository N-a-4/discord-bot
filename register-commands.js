import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
async function main(){
  const token = process.env.DISCORD_TOKEN, appId = process.env.APPLICATION_ID, guildId = process.env.GUILD_ID;
  if (!token || !appId || !guildId) { console.log('Missing env'); return; }
  const rest = new REST({ version:'10' }).setToken(token);
  const body = [{ name:'rustify', description:'Открыть проект Rustify (CV2)', options:[] }];
  await rest.put(Routes.applicationGuildCommands(appId, guildId), { body });
  console.log('commands registered', guildId);
}
main().catch(console.error);