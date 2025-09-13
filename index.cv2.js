import 'dotenv/config';
import {
  Client, GatewayIntentBits, Partials,
  ButtonBuilder, ButtonStyle, ActionRowBuilder,
  MessageFlags,
  ContainerBuilder, TextDisplayBuilder, SectionBuilder, ThumbnailBuilder
} from 'discord.js';
import { REST as DiscordREST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import fs from 'node:fs';

const DATA = JSON.parse(fs.readFileSync(new URL('./exported_project.json', import.meta.url), 'utf8'));
// --- keepalive for Render Web Service ---
import http from 'node:http';
const PORT = process.env.PORT || 10000;
try {
  http.createServer((_req, res) => { res.writeHead(200); res.end('ok'); }).listen(PORT, () => {
    console.log('[web] listening on', PORT);
  });
} catch {}

const PAGES = new Map(); for (const e of DATA.embeds || []) if (e?.id) PAGES.set(String(e.id), e);
const state = new Map(); // messageId -> { stack: [id] }
function findPage(id){ return PAGES.get(String(id)); }

function renderCV2(page){
  const container = new ContainerBuilder();
  if (typeof page.color === 'number') container.setAccentColor(page.color);
  const navButtons = [];
  for (const item of page.items || []) {
    if (!item) continue;
    if (item.type === 'text' && item.text) {
      container.addTextDisplayComponents(td => td.setContent(String(item.text)));
    } else if (item.type === 'image' && item.url) {
      container.addSectionComponents(sec => sec
        .addTextDisplayComponents(td => td.setContent(item.caption || ''))
        .setThumbnailAccessory(th => th.setURL(String(item.url)))
      );
    } else if (item.type === 'buttons' && Array.isArray(item.buttons)) {
      for (const b of item.buttons) {
        const label = String(b.label ?? 'Кнопка');
        const target = b.linkToEmbedId || b.linkTo;
        const href = b.href || b.url;
        if (target && findPage(target)) navButtons.push(new ButtonBuilder().setCustomId('go:'+target).setLabel(label).setStyle(ButtonStyle.Primary));
        else if (href) navButtons.push(new ButtonBuilder().setLabel(label).setStyle(ButtonStyle.Link).setURL(String(href)));
      }
    }
  }
  if (navButtons.length) container.addActionRowComponents(row => row.setComponents(...navButtons.slice(0,5)));
  container.addActionRowComponents(row => row.setComponents(
    new ButtonBuilder().setCustomId('sys:back').setLabel('Назад').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('sys:home').setLabel('Домой').setStyle(ButtonStyle.Secondary),
  ));
  return container;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], partials: [Partials.Channel] });
client.once('ready', () => console.log('[ready]', client.user.tag));

client.on('interactionCreate', async (i) => {
  try {
    if (i.isChatInputCommand()) {
      if (i.commandName === 'rustify') {
        const startId = i.options.getString('page') || (DATA.embeds?.[0]?.id);
        const start = findPage(startId);
        if (!start) return i.reply({ content: 'Стартовая страница не найдена: '+startId, ephemeral: true });
        const view = renderCV2(start);
        const msg  = await i.reply({ components: [view], flags: MessageFlags.IsComponentsV2, fetchReply: true });
        state.set(msg.id, { stack: [start.id] });
      }
      return;
    }
    if (i.isButton()) {
      const [kind, arg] = String(i.customId).split(':', 2);
      const s = state.get(i.message.id) || { stack: [] };
      if (kind === 'go') {
        const target = findPage(arg); if (!target) return;
        s.stack.push(target.id);
        const view = renderCV2(target);
        await i.update({ components: [view], flags: MessageFlags.IsComponentsV2 });
        state.set(i.message.id, s);
        return;
      }
      if (kind === 'sys') {
        if (arg === 'back') {
          if (s.stack.length > 1) s.stack.pop();
          const cur = findPage(s.stack.at(-1));
          const view = renderCV2(cur);
          await i.update({ components: [view], flags: MessageFlags.IsComponentsV2 });
          state.set(i.message.id, s);
          return;
        }
        if (arg === 'home') {
          const homeId = DATA.embeds?.[0]?.id;
          if (homeId) {
            s.stack = [homeId];
            const view = renderCV2(findPage(homeId));
            await i.update({ components: [view], flags: MessageFlags.IsComponentsV2 });
            state.set(i.message.id, s);
          }
          return;
        }
      }
    }
  } catch (err) {
    console.error('[interaction] error', err);
    try { await i.reply({ content: 'Ошибка обработки', ephemeral: true }); } catch {}
  }
});

async function ensureCommands(){
  const token = process.env.DISCORD_TOKEN, appId = process.env.APPLICATION_ID, guildId = process.env.GUILD_ID;
  if (!token || !appId || !guildId) return;
  const rest = new DiscordREST({ version:'10' }).setToken(token);
  const body = [{ name:'rustify', description:'Открыть навигационные страницы (Components V2)', options:[{name:'page', description:'Стартовая страница (id/slug)', type:3, required:false}] }];
  try { await rest.put(Routes.applicationGuildCommands(appId, guildId), { body }); console.log('[commands] registered', guildId); }
  catch(e){ console.warn('[commands] register failed', e.rawError ?? e); }
}
await ensureCommands();
await client.login(process.env.DISCORD_TOKEN);
