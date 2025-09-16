// commands/emojis.js — shows Application Emojis names→ids (robust to { id, animated })
const { SlashCommandBuilder } = require('discord.js');
const { loadApplicationEmojis } = require('../resolveEmojisByName');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emojis')
    .setDescription('Показать эмодзи приложения (имя → id и синтаксис).'),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    let map = await loadApplicationEmojis();
    if (!map) map = {};

    // Build entries from object or Map
    const entries = map instanceof Map
      ? Array.from(map.entries())
      : Object.entries(map);

    entries.sort((a, b) => a[0].localeCompare(b[0], 'ru'));

    // Show up to 60 lines to stay within small message limits
    const max = 60;
    const first = entries.slice(0, max);

    const lines = first.map(([name, meta]) => {
      let id, animated = false;
      if (meta && typeof meta === 'object') {
        id = meta.id ?? null;
        animated = !!meta.animated;
      } else {
        id = meta ?? null;
      }
      const idText = id ? String(id) : '—';
      const syntax = id ? `${animated ? '<a:' : '<:'}${name}:${id}>` : '—';
      const animText = animated ? ' (anim)' : '';
      return `${name} → ${idText}${animText}  ${syntax}`;
    });

    const more = entries.length > first.length
      ? `\n... и ещё ${entries.length - first.length}`
      : '';

    await interaction.editReply(
      'Найдено: ' + entries.length + '\n' +
      (lines.join('\n') || '(пусто)') + more
    );
  }
};
