const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png")
    )
  )

    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis['24hours']} **Ежедневный бонус**
${emojis.dot_purp} Забирайте **25**${emojis.rusticoin} ежедневно`),
    )
    .setButtonAccessory(btn => btn.setLabel("Получить").setCustomId("embed:sub-1755323150368-hyj9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.coins.id }))
  
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.star_anim_yell} **Новый уровень**
${emojis.dot_purp} Получайте РастиКоины каждый раз когда достигаете новый уровень`),
    )
    .setButtonAccessory(btn => btn.setLabel("Получить").setCustomId("btn:btn-titfdx").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.coins.id }).setDisabled(true))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.discord_mix} **Вступить в [Discord](https://discord.gg/rustify)**
${emojis.dot_purp} Станьте участником нашего комьюнити`),
    )
    .setButtonAccessory(btn => btn.setLabel("Получить").setCustomId("btn:btn-1758194713331").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.coins.id }).setDisabled(true))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.gift_mix} **Бонусы за действия**
${emojis.dot_purp} Выполняйте задания и зарабатывайте растикоины`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("btn:btn-yce4zr").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.handshake_mix} **Реферальная система**
${emojis.dot_purp} Получай по **15**${emojis.rusticoin}за каждого друга достигнувшего 3 LvL`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:sub-1755959804175-sl05").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})