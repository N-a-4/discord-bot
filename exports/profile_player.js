const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/39ynLZ21/5.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("embed:embed-1756285093009").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.back_purp.id }),
      new ButtonBuilder().setLabel("Подключения").setCustomId("embed:sub-1756382998750-a1pw").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.connect_mix.id }).setDisabled(true)
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.steam_mix} **Steam**
${emojis.dot_gray} Позвольте игрокам узнать о вас чуточку больше, чем просто ник`),
    )
    .setButtonAccessory(btn => btn.setLabel("Настройки").setCustomId("btn:btn-bjfbt4").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.settings_yell.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.tg} **Telegram**
${emojis.dot_gray} Получите гибкую систему полезных уведомлений`),
    )
    .setButtonAccessory(btn => btn.setLabel("Настройки").setCustomId("btn:btn-zvs0cs").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.settings_yell.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.bm} **Battlemetrics**
${emojis.dot_gray} Узнайте больше о вашей игровой жизни`),
    )
    .setButtonAccessory(btn => btn.setLabel("Подключить").setCustomId("btn:btn-1757336298289").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.more_purp.id }))
  )
let selectRow;
let buttonsRow;
// buttonsRow
  buttonsRow = new ActionRowBuilder();
  buttonsRow.addComponents(new ButtonBuilder().setLabel("Закрыть").setCustomId("embed:embed-1754855196673").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.cross_purp.id }));
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, selectRow, buttonsRow].filter(Boolean)
})