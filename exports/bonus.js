const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png")
    )
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis['24hours']} **Ежедневный бонус**
${emojis.dot_purp} Забирайте **25**${emojis.rusticoin} ежедневно`),
    )
    .setButtonAccessory(btn => btn.setLabel("Получить").setCustomId("embed:sub-1755323150368-hyj9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.coins.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.star_anim_yell} **Новый уровень**
${emojis.dot_purp} Получайте **10**${emojis.rusticoin}  каждый раз когда достигаете новый уровень`),
    )
    .setButtonAccessory(btn => btn.setLabel("Получить").setCustomId("btn:btn-titfdx").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.coins.id }).setDisabled(true))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.gift_mix} **Бонусы за действия**
${emojis.dot_purp} Выполняйте задания и зарабатывайте растикоины`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:sub-1758210076081-2aj3").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.handshake_mix} **Реферальная система**
${emojis.dot_purp} Получай по **15**${emojis.rusticoin}за каждого друга достигнувшего 3 LvL`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:sub-1755959804175-sl05").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
let selectRow;
let buttonsRow;
// buttonsRow
  buttonsRow = new ActionRowBuilder();
  buttonsRow.addComponents(new ButtonBuilder().setLabel("Закрыть").setCustomId("mini:mini-x8zwm6j").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.cross_purp.id }));
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, selectRow, buttonsRow].filter(Boolean)
})