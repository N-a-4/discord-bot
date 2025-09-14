export async function renderEmbed(interaction, deps){\n  const { ContainerBuilder, MediaGalleryItemBuilder, ButtonBuilder, ButtonStyle, SeparatorSpacingSize, MessageFlags, ActionRowBuilder, StringSelectMenuBuilder } = deps;\n  function __buildEmojiMap(guild){ const m = Object.create(null); if (!guild) return m; const cache = guild && guild.emojis && guild.emojis.cache; if (cache && cache.forEach){ cache.forEach(e => { if (e && e.name) m[e.name] = { id: e.id, name: e.name, animated: !!e.animated }; }); } return m; }\n  const __base = (deps && deps.emojis) || __buildEmojiMap(interaction.guild) || {};\n  const emojis = new Proxy(__base, { get(t, p){ if (typeof p !== 'string') return t[p]; return (p in t) ? t[p] : { id: undefined, name: p, animated: false }; } });\n  try { if (typeof globalThis !== 'undefined') { globalThis.emojis = emojis; } } catch(_){ }\n  const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/39ynLZ21/5.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("embed:sub-1754942674709-psz9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.back_purp.id }),
      new ButtonBuilder().setLabel("Профиль").setCustomId("btn:btn-1754934461264").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user_2_mix.id }),
      new ButtonBuilder().setLabel("Друзья").setCustomId("embed:sub-1755604825553-gjw9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.handshake_mix.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.user_2_mix} **Игрок**: @username (\`.na4.\`)
${emojis.steam_mix} **Steam**: Не подключен
${emojis.star_yell} \`Репутация\`: 3.7 • 12 оценок
${emojis.balance} \`Баланс\`: Скоро`))
    .setThumbnailAccessory(thumb => thumb.setURL("https://images-ext-1.discordapp.net/external/Pgg89Z8fyGPWp46CwwQSh1NWFejJIU4YpsGArxYTFvc/https/cdn.discordapp.com/avatars/628606966540926978/a_50d35d8c13e85d5772bb8a8666b41452.gif?width=141&height=141"))
  )
  .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.crown_mix} **Клан**: **[BiG](https:///adasd.com/)**
${emojis.a2} **Должность**: Заместитель`))
  .addActionRowComponents(row => row.addComponents(new ButtonBuilder().setLabel("Профиль клана").setCustomId("embed:embed-1754860281662").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id })))
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addTextDisplayComponents(textDisplay => textDisplay.setContent(`### Клановая активность
${emojis.mic_small_purple} **Общение с кланом**: 691ч.
${emojis.dot_yell} \`За 7 дней\`: 17ч.
${emojis.dot_yell} \`За 30 дней\`: 48ч.

${emojis.gamepad_small_purple} **Наиграно в RUST**: 394ч.
${emojis.dot_yell} \`За 7 дней\`: 12ч.
${emojis.dot_yell} \`За 30 дней\`: 64ч.`))
  .addActionRowComponents(row => row.addComponents(new ButtonBuilder().setLabel("148").setCustomId("btn:btn-1756791737674").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.love.id })))
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Общая").setCustomId("mini:mini-9wvcu97").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setLabel("Клановая").setCustomId("btn:btn-1755093081717").setStyle(ButtonStyle.Secondary)
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.stat_mix} **Аналитика игрока**
${emojis.dot_gray} Боевые показатели и прочая статистика`))
  .addActionRowComponents(row => row.addComponents(new ButtonBuilder().setLabel("Смотреть").setCustomId("embed:sub-1755374150209-io3o").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id })))
  .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.report} **Жалобы**
${emojis.dot_gray} Просмотр нарушений и создание жалоб`))
  .addActionRowComponents(row => row.addComponents(new ButtonBuilder().setLabel("Смотреть").setCustomId("embed:embed-mefmj95w-kyz4n").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id })))
  .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis['24hours']} **История кланов**
${emojis.dot_gray} Список кланов в которых состоял игрок`))
  .addActionRowComponents(row => row.addComponents(new ButtonBuilder().setLabel("Смотреть").setCustomId("embed:sub-1755357504688-2489").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id })))

{ // selectRow
  const selectRow = new ActionRowBuilder();
  const sel = new StringSelectMenuBuilder().setCustomId("select").setPlaceholder("Поставьте оценку данному игроку").setOptions({ label: "5 — Отличный тиммейт", value: "5_—_отличный_тиммейт", description: "Надёжен, всегда помогает команде, выполняет договорённости, не бросает в бою.", emoji: { id: emojis["5score"].id } }, { label: "4 — Доверенный союзник", value: "4_—_доверенный_союзник", description: "Играет слаженно, выполняет свою роль, но может иногда действовать по-своему.", emoji: { id: emojis["4score"].id } }, { label: "3 — Обычный тиммейт", value: "3_—_обычный_тиммейт", description: "Не токсичен, не предаёт, но и не проявляет особой вовлечённости в командную игру.", emoji: { id: emojis["3score"].id } }, { label: "2 — Сложный игрок", value: "2_—_сложный_игрок", description: "Играет нестабильно, может вести себя неадекватно.", emoji: { id: emojis["2score"].id } }, { label: "1 — Опасный игрок", value: "1_—_опасный_игрок", description: "Может украсть лут, слить базу, специально мешать игре или предать в самый важный момент.", emoji: { id: emojis["1score"].id } });
  selectRow.addComponents(sel);
}
{ // buttonsRow
  const buttonsRow = new ActionRowBuilder();
  buttonsRow.addComponents(new ButtonBuilder().setCustomId("embed:sub-1754942674709-psz9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.back_purp.id }));
  buttonsRow.addComponents(new ButtonBuilder().setLabel("Закрыть").setCustomId("btn:btn-1755084324911").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.cross_purp.id }));
}
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, selectRow, buttonsRow]
})\n}\n