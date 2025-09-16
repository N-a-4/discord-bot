// commands/emojis.js — robust output (no hangs), handles {id, animated}, trims to 1900 chars
const { SlashCommandBuilder } = require('discord.js');
const { loadApplicationEmojis } = require('../resolveEmojisByName');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emojis')
    .setDescription('Показать эмодзи приложения (имя → id и синтаксис).'),
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      let map = await loadApplicationEmojis();
      if (!map) map = {};

      const entries = map instanceof Map
        ? Array.from(map.entries())
        : Object.entries(map);

      entries.sort((a, b) => a[0].localeCompare(b[0]));

      const lines = [];
      const BUDGET = 1900; // запас до лимита 2000
      let totalLen = 0;
      let shown = 0;

      for (const [name, meta] of entries) {
        let id = null, animated = false;
        if (meta && typeof meta === 'object') {
          id = meta.id ?? null;
          animated = !!meta.animated;
        } else {
          id = meta ?? null;
        }
        const idText = id ? String(id) : '—';
        const syntax = id ? `${animated ? '<a:' : '<:'}${name}:${id}>` : '—';
        const animText = animated ? ' (anim)' : '';
        const line = `${name} → ${idText}${animText}  ${syntax}`;
        if (totalLen + line.length + 1 > BUDGET) break;
        lines.push(line);
        totalLen += line.length + 1;
        shown++;
      }

      const more = entries.length > shown ? `\n... и ещё ${entries.length - shown}` : '';

      await interaction.editReply(
        'Найдено: ' + entries.length + '\n' +
        (lines.join('\n') || '(пусто)') + more
      );
    } catch (e) {
      const msg = (e && e.message) ? e.message : String(e);
      try {
        await interaction.editReply('Ошибка: ' + msg.slice(0, 1800));
      } catch {
        // swallow
      }
      throw e; // чтобы увидеть в логах
    }
  }
};
