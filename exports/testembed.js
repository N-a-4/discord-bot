
// --- PATCH: safe emojis (buttons: emojis removed to avoid runtime errors); select options sanitized below ---
const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/39ynLZ21/5.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("•").setCustomId("embed:sub-1754942674709-psz9").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setLabel("Профиль").setCustomId("btn:btn-1754934461264").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setLabel("Друзья").setCustomId("embed:sub-1755604825553-gjw9").setStyle(ButtonStyle.Secondary)
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.user_2_mix} **Игрок**: @username (\`.na4.\`)
${emojis.steam_mix} **Steam**: Не подключен
${emojis.star_yell} \`Репутация\`: 3.7 • 12 оценок
${emojis.balance} \`Баланс\`: Скоро`))
    .setThumbnailAccessory(thumb => { thumb.setURL("https://images-ext-1.discordapp.net/external/Pgg89Z8fyGPWp46CwwQSh1NWFejJIU4YpsGArxYTFvc/https/cdn.discordapp.com/avatars/628606966540926978/a_50d35d8c13e85d5772bb8a8666b41452.gif?width=141&height=141"); return thumb; })
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.crown_mix} **Клан**: **[BiG](https:///adasd.com/)**
${emojis.a2} **Должность**: Заместитель`))
    .setButtonAccessory(btn => { return btn.setLabel("Профиль клана").setCustomId("embed:embed-1754860281662").setStyle(ButtonStyle.Secondary); })
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`### Клановая активность
${emojis.mic_small_purple} **Общение с кланом**: 691ч.
${emojis.dot_yell} \`За 7 дней\`: 17ч.
${emojis.dot_yell} \`За 30 дней\`: 48ч.

${emojis.gamepad_small_purple} **Наиграно в RUST**: 394ч.
${emojis.dot_yell} \`За 7 дней\`: 12ч.
${emojis.dot_yell} \`За 30 дней\`: 64ч.`))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Общая").setCustomId("mini:mini-9wvcu97").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setLabel("Клановая").setCustomId("btn:btn-1755093081717").setStyle(ButtonStyle.Secondary)
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.stat_mix} **Статистика**
${emojis.dot_gray} Игровые показатели игрока`))
    .setButtonAccessory(btn => { return btn.setLabel("Смотреть").setCustomId("embed:sub-1755374150209-io3o").setStyle(ButtonStyle.Secondary); })
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.report} **Жалобы**
${emojis.dot_gray} Просмотр нарушений и создание жалоб`))
    .setButtonAccessory(btn => { return btn.setLabel("Смотреть").setCustomId("embed:embed-mefmj95w-kyz4n").setStyle(ButtonStyle.Secondary); })
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis['24hours']} **История кланов**
${emojis.dot_gray} Список кланов в которых состоял игрок`))
    .setButtonAccessory(btn => { return btn.setLabel("Смотреть").setCustomId("embed:sub-1755357504688-2489").setStyle(ButtonStyle.Secondary); })
  )
let selectRow;
let buttonsRow;
// selectRow
  selectRow = new ActionRowBuilder();
  const sel = new StringSelectMenuBuilder().setCustomId("select").setPlaceholder("Поставьте оценку данному игроку").setOptions({ label: "5 — Отличный тиммейт", value: "5_—_отличный_тиммейт", description: "Надёжен, всегда помогает команде, выполняет договорённости, не бросает в бою.", emoji: { id: emojis["5score"].id } }, { label: "4 — Доверенный союзник", value: "4_—_доверенный_союзник", description: "Играет слаженно, выполняет свою роль, но может иногда действовать по-своему.", emoji: { id: emojis["4score"].id } }, { label: "3 — Обычный тиммейт", value: "3_—_обычный_тиммейт", description: "Не токсичен, не предаёт, но и не проявляет особой вовлечённости в командную игру.", emoji: { id: emojis["3score"].id } }, { label: "2 — Сложный игрок", value: "2_—_сложный_игрок", description: "Играет нестабильно, может вести себя неадекватно.", emoji: { id: emojis["2score"].id } }, { label: "1 — Опасный игрок", value: "1_—_опасный_игрок", description: "Может украсть лут, слить базу, специально мешать игре или предать в самый важный момент.", emoji: { id: emojis["1score"].id } });
  // sanitize select options emojis
  try {
    const sanitized = sel.toJSON();
    if (Array.isArray(sanitized.options)) {
      sanitized.options = sanitized.options.map(o => {
        if (!o?.emoji?.id) { if (o.emoji) delete o.emoji; }
        return o;
      });
    }
    const rebuilt = new StringSelectMenuBuilder(sanitized);
    selectRow.addComponents(rebuilt);
  } catch {
    selectRow.addComponents(sel);
  }
// buttonsRow
  buttonsRow = new ActionRowBuilder();
  buttonsRow.addComponents(new ButtonBuilder().setLabel("•").setCustomId("embed:sub-1754942674709-psz9").setStyle(ButtonStyle.Secondary));
  buttonsRow.addComponents(new ButtonBuilder().setLabel("Закрыть").setCustomId("btn:btn-1755084324911").setStyle(ButtonStyle.Secondary));
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, selectRow, buttonsRow]
})