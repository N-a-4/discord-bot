
import 'dotenv/config';
import {
  Client, GatewayIntentBits, Partials,
  ButtonBuilder, ButtonStyle,
  MessageFlags,
  ContainerBuilder, SectionBuilder, TextDisplayBuilder
} from 'discord.js';
import { REST as DiscordREST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import fs from 'node:fs';
import http from 'node:http';

// keepalive for Render Web Service
const PORT = process.env.PORT || 10000;
http.createServer((_req, res) => { res.writeHead(200); res.end('ok'); }).listen(PORT, () => {
  console.log('[web] listening on', PORT);
});

// ---- robust normalizer for your JSON / TS exports ----
const RAW = JSON.parse(fs.readFileSync(new URL('./exported_project.json', import.meta.url), 'utf8'));

// Try to locate embeds array in common places
const rootEmbeds =
  RAW?.embeds ||
  RAW?.data?.embeds ||
  RAW?.project?.embeds ||
  RAW?.pages ||
  [];

// id -> normalized page
const PAGES = new Map();

function str(x){ return x == null ? '' : String(x); }
function isURL(s){ return typeof s === 'string' && new RegExp('^(https?:)?//').test(s); }

function pickBanner(obj){
  const cands = [
    obj?.banner, obj?.hero, obj?.image, obj?.cover,
    obj?.thumbnail, obj?.preview,
  ];
  for (const c of cands){
    if (!c) continue;
    if (typeof c === 'string' && isURL(c)) return c;
    if (typeof c?.url === 'string') return c.url;
    if (typeof c?.src === 'string') return c.src;
    if (typeof c?.href === 'string') return c.href;
    if (typeof c?.background === 'string') return c.background;
  }
  return null;
}

function collectImages(items = []){
  const out = [];
  for (const it of items){
    if (!it) continue;
    if (it.type === 'image' && (it.url || it.src || it.href || it.background)){
      out.push({ url: it.url || it.src || it.href || it.background, caption: it.caption || it.title || '' });
    }
    const nested = it.items || it.children || it.blocks;
    if (Array.isArray(nested)) out.push(...collectImages(nested));
  }
  return out;
}

function collectTexts(items = [], page = {}){
  const out = [];
  if (page.title) out.push(String(page.title));
  if (page.subtitle) out.push(String(page.subtitle));
  if (page.description) out.push(String(page.description));
  for (const it of items){
    if (!it) continue;
    const t = it.text || it.content || it.description || it.value;
    if (it.type === 'text' && t) out.push(String(t));
    const nested = it.items || it.children || it.blocks;
    if (Array.isArray(nested)) out.push(...collectTexts(nested));
  }
  return out;
}

function collectButtons(items = [], page = {}){
  const out = [];
  const pushBtn = (b)=>{
    if (!b) return;
    const label = b.label ?? b.text ?? 'Кнопка';
    const url = b.url ?? b.href;
    const linkTo = b.linkToEmbedId ?? b.linkTo ?? b.to;
    out.push({ label: String(label), url, linkTo });
  };
  if (Array.isArray(page.buttons)) for (const b of page.buttons) pushBtn(b);
  if (Array.isArray(page.actions)) for (const b of page.actions) pushBtn(b);
  for (const it of items){
    if (!it) continue;
    if (it.type === 'buttons' && Array.isArray(it.buttons)) for (const b of it.buttons) pushBtn(b);
    const nested = it.items || it.children || it.blocks;
    if (Array.isArray(nested)) out.push(...collectButtons(nested));
  }
  return out;
}

function normalizePage(raw){
  const id = String(raw.id ?? raw.slug ?? raw.key ?? cryptoRandom());
  const color = typeof raw.color === 'number' ? raw.color : undefined;
  const items = raw.items || raw.children || raw.blocks || [];
  const images = collectImages(items);
  const banner = pickBanner(raw) || (images[0]?.url ?? null);
  const texts = collectTexts(items, raw);
  const buttons = collectButtons(items, raw);
  return { id, color, banner, texts, buttons, _raw: raw };
}

function cryptoRandom(){
  try { return globalThis.crypto.randomUUID(); } catch { return String(Date.now())+Math.random().toString(16).slice(2); }
}

for (const e of rootEmbeds){
  if (!e) continue;
  const np = normalizePage(e);
  PAGES.set(np.id, np);
}
if (PAGES.size === 0 && Array.isArray(rootEmbeds)){
  rootEmbeds.forEach((e, idx) => PAGES.set(String(idx+1), normalizePage(e)));
}

function findPage(id){
  if (!id) return PAGES.values().next().value;
  return PAGES.get(String(id)) || PAGES.values().next().value;
}

// ---- Components V2 rendering with hero image ----
function renderCV2(np){
  const container = new ContainerBuilder();

  if (np?.banner && isURL(np.banner)){
    container.addSectionComponents(sec => {
      try {
        sec.setThumbnailAccessory(th => {
          th.setURL(String(np.banner));
          if (typeof th.setSize === 'function') th.setSize('LARGE');
          if (typeof th.setShape === 'function') th.setShape('RECTANGLE');
          if (typeof th.setStyle === 'function') th.setStyle('HERO');
        });
      } catch {}
      sec.addTextDisplayComponents(td => td.setContent('​'));
    });
  }

  for (const t of (np.texts || []).slice(0, 12)) {
    container.addTextDisplayComponents(td => td.setContent(String(t)));
  }

  const nav = [];
  for (const b of (np.buttons || []).slice(0, 5)) {
    const label = b.label || 'Кнопка';
    if (b.url) {
      nav.push(new ButtonBuilder().setLabel(label).setStyle(ButtonStyle.Link).setURL(String(b.url)));
    } else if (b.linkTo && PAGES.has(String(b.linkTo))) {
      nav.push(new ButtonBuilder().setCustomId('go:'+String(b.linkTo)).setLabel(label).setStyle(ButtonStyle.Primary));
    }
  }
  if (nav.length) container.addActionRowComponents(row => row.setComponents(...nav));

  container.addActionRowComponents(row => row.setComponents(
    new ButtonBuilder().setCustomId('sys:back').setLabel('Назад').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('sys:home').setLabel('Домой').setStyle(ButtonStyle.Secondary),
  ));

  return container;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], partials: [Partials.Channel] });
client.once('ready', () => console.log('[ready]', client.user.tag));

const stackByMsg = new Map(); // messageId -> [pageId]

client.on('interactionCreate', async (i) => {
  try {
    if (i.isChatInputCommand() && i.commandName === 'rustify') {
      const startId = i.options.getString('page');
      const start = findPage(startId);
      if (!start) return i.reply({ content: 'Стартовая страница не найдена', ephemeral: true });
      const view = renderCV2(start);
      const msg  = await i.reply({ components: [view], flags: MessageFlags.IsComponentsV2, fetchReply: true });
      stackByMsg.set(msg.id, [start.id]);
      return;
    }
    if (i.isButton()) {
      const [kind, arg] = String(i.customId).split(':', 2);
      const stack = stackByMsg.get(i.message.id) || [];
      if (kind === 'go') {
        const target = findPage(arg);
        if (!target) return;
        stack.push(target.id);
        const view = renderCV2(target);
        await i.update({ components: [view], flags: MessageFlags.IsComponentsV2 });
        stackByMsg.set(i.message.id, stack);
        return;
      }
      if (kind === 'sys') {
        if (arg === 'back') {
          if (stack.length > 1) stack.pop();
          const cur = findPage(stack.at(-1));
          const view = renderCV2(cur);
          await i.update({ components: [view], flags: MessageFlags.IsComponentsV2 });
          stackByMsg.set(i.message.id, stack);
          return;
        }
        if (arg === 'home') {
          const home = PAGES.values().next().value;
          const view = renderCV2(home);
          stackByMsg.set(i.message.id, [home.id]);
          await i.update({ components: [view], flags: MessageFlags.IsComponentsV2 });
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
  const body = [{ name:'rustify', description:'Открыть проект Rustify (CV2 hero)', options:[{name:'page', description:'Стартовая страница (id/slug)', type:3, required:false}] }];
  try { await rest.put(Routes.applicationGuildCommands(appId, guildId), { body }); console.log('[commands] registered', guildId); }
  catch(e){ console.warn('[commands] register failed', e.rawError ?? e); }
}
await ensureCommands();
await client.login(process.env.DISCORD_TOKEN);
