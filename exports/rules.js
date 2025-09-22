const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Общие правила").setCustomId("btn:btn-1756053696332").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.anketa_mix.id }).setDisabled(true),
      new ButtonBuilder().setLabel("Кланы").setCustomId("mini:mini-hvwkwje").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addTextDisplayComponents(
    textDisplay => textDisplay
      .setContent('### Общие правила'),
  )
  .addTextDisplayComponents(
    textDisplay => textDisplay
      .setContent('ПРОВЕРЯЕМ'),
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("148").setCustomId("btn:btn-1757952597917").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.like.id })
    )
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