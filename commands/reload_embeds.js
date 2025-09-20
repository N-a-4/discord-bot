// commands/reload_embeds.js — Slash version
const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { requireFresh } = require('../utils/requireFresh');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload_embeds')
    .setDescription('Reload imported embed files from exports/incoming')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    try {
      const incomingDir = path.join(__dirname, '..', 'exports', 'incoming');
      if (!fs.existsSync(incomingDir)) {
        return interaction.reply({ content: 'Нет папки exports/incoming — нечего перезагружать', ephemeral: true });
      }

      const files = fs.readdirSync(incomingDir).filter(f => f.endsWith('.js'));
      let ok = 0, fail = 0, errors = [];

      for (const f of files) {
        const full = path.join(incomingDir, f);
        try {
          requireFresh(full);
          ok++;
        } catch (e) {
          fail++;
          errors.push(`${f}: ${e && e.message || e}`);
        }
      }

      const report = `✅ OK: ${ok}  ❌ FAIL: ${fail}` + (errors.length ? `\n\nОшибки:\n- ${errors.join('\n- ')}` : '');
      return interaction.reply({ content: `Импорты перезагружены.\n${report}`, ephemeral: true });
    } catch (err) {
      console.error('reload_embeds error', err);
      return interaction.reply({ content: 'Ошибка при перезагрузке импортов', ephemeral: true });
    }
  }
};
