// fs-ingest/commands/rustify.js
const { SlashCommandBuilder } = require('discord.js');
const Registry = require('../fs-registry');
const { collectEmojiNamesFromCode } = require('../collectEmojiNames');
const { resolveEmojisByName } = require('../resolveEmojisByName');
const { runExportJS } = require('../runner');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rustify')
    .setDescription('Показать экспорт из ./exports (Components)')
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
    await interaction.deferReply();
    const emojiNames = collectEmojiNamesFromCode(entry.code);
    const { nameToId, missing } = await resolveEmojisByName(interaction.guild, emojiNames);
    if (missing.length) {
      await interaction.editReply({ content: 'Не найдены эмодзи: ' + missing.join(', ') });
      return;
    }
    try {
      await runExportJS(entry.code, interaction, nameToId);
    } catch (e) {
      await interaction.editReply({ content: 'Ошибка исполнения экспорта: ' + (e?.message || e) });
    }
  }
};