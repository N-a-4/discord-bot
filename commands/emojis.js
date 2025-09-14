// commands/emojis.js — shows Application Emojis names→ids for diagnostics
const { SlashCommandBuilder } = require('discord.js');
const { loadApplicationEmojis } = require('../resolveEmojisByName');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('appemojis')
    .setDescription('Показать эмодзи приложения (имя → id).'),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const map = await loadApplicationEmojis();
    const names = Object.keys(map).sort();
    const first = names.slice(0, 50);
    const lines = first.map(n => `${n} → ${map[n]}`);
    const more = names.length > first.length ? `\n... и ещё ${names.length - first.length}` : '';
    await interaction.editReply('Найдено: ' + names.length + '\n' + (lines.join('\n') || '(пусто)') + more);
  }
};