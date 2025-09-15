// commands/rustify.js
// v2 — safe runner for exported CV2 embeds with graceful fallback
// Keeps your Registry + runExportJS pipeline, but never leaves the user without a message.

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const Registry = require('../fs-registry');
const { collectEmojiNamesFromCode } = require('../collectEmojiNames');
const { resolveEmojisByName } = require('../resolveEmojisByName');
const { runExportJS } = require('../runner');

function buildFallbackEmbed(name, details) {
  const embed = new EmbedBuilder()
    .setTitle('Rustify • Fallback')
    .setDescription(`Экспорт **${name}** пока не может быть показан.\nЯ вывожу запасной вариант, чтобы команда работала.`)
    .setColor(0x2ecc71);

  if (details?.missing && details.missing.length) {
    const list = details.missing.slice(0, 15).join(', ');
    embed.addFields({ name: 'Отсутствуют эмодзи (по имени)', value: list + (details.missing.length > 15 ? '…' : '') });
  }
  if (details?.error) {
    const msg = (details.error?.message || String(details.error)).slice(0, 300);
    embed.addFields({ name: 'Ошибка', value: '```' + msg + '```' });
  }
  return embed;
}

function buildFallbackComponents() {
  const row1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rustify_profile')
      .setLabel('Профиль')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('rustify_clan')
      .setLabel('Клан')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setLabel('Rustify')
      .setStyle(ButtonStyle.Link)
      .setURL('https://rustify.gg/')
  );

  const row2 = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('rustify_select')
      .setPlaceholder('Выберите раздел')
      .addOptions(
        { label: 'Рекрутинг', value: 'recruiting' },
        { label: 'Новости', value: 'news' },
        { label: 'Поддержка', value: 'support' },
      )
  );

  return [row1, row2];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rustify')
    .setDescription('Показать экспорт из ./exports (Components) или fallback, если экспорт недоступен')
    .addStringOption(o => o
      .setName('name')
      .setDescription('Имя экспорта (файл в ./exports без .js)')
      .setRequired(true)
      .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focused = interaction.options.getFocused().toLowerCase();
    const choices = Registry.list().filter(n => n.toLowerCase().includes(focused)).slice(0, 25);
    await interaction.respond(choices.map(n => ({ name: n, value: n })));
  },

  async execute(interaction) {
    const name = interaction.options.getString('name', true);
    const entry = Registry.get(name);
    if (!entry) {
      await interaction.reply({ ephemeral: true, content: `Экспорт "${name}" не найден в ${Registry.EXPORTS_DIR}` });
      return;
    }

    await interaction.deferReply({ ephemeral: false });

    // 1) Собираем имена эмодзи из исходника
    let emojiNames = [];
    try {
      emojiNames = collectEmojiNamesFromCode(entry.code) || [];
    } catch (err) {
      console.error('[rustify] collectEmojiNamesFromCode failed:', err);
      // не фейлим — просто идём дальше без эмодзи-карты
    }

    // 2) Резолвим эмодзи приложений по именам
    let nameToId = {};
    let missing = [];
    try {
      const r = await resolveEmojisByName(interaction.guild, emojiNames);
      nameToId = r?.nameToId || {};
      missing = r?.missing || [];
    } catch (err) {
      console.error('[rustify] resolveEmojisByName failed:', err);
      // не прерываем — пойдём в fallback
      const embed = buildFallbackEmbed(name, { error: err });
      const components = buildFallbackComponents();
      await interaction.editReply({ content: '⚠️ Не удалось получить карту эмодзи, показан запасной вариант.', embeds: [embed], components });
      return;
    }

    // 3) Если есть пропажи — сразу fallback, чтобы не падал экспорт
    if (missing.length) {
      const embed = buildFallbackEmbed(name, { missing });
      const components = buildFallbackComponents();
      await interaction.editReply({
        content: '⚠️ Не найдены эмодзи по именам. Проверьте наличие **Application Emojis** в настройках приложения.',
        embeds: [embed],
        components
      });
      return;
    }

    // 4) Пытаемся выполнить экспортированный JS
    try {
      await runExportJS(entry.code, interaction, nameToId);
    } catch (e) {
      console.error('[rustify] runExportJS error:', e);
      const embed = buildFallbackEmbed(name, { error: e });
      const components = buildFallbackComponents();
      await interaction.editReply({ content: '⚠️ Ошибка исполнения экспорта. Показан fallback.', embeds: [embed], components });
    }
  }
};
