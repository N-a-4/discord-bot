const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/39ynLZ21/5.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Профиль").setCustomId("btn:b1").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user.id }).setDisabled(true),
      new ButtonBuilder().setLabel("Друзья").setCustomId("embed:sub-1756382998750-a1pw").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.handshake_mix.id }),
      new ButtonBuilder().setLabel("Депозит").setCustomId("embed:sub-1756383981566-rxh9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.money.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))

    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user_2_mix} **Игрок**: @username (\`.na4.\`)
${emojis.steam_mix} **Steam**: Не подключен
${emojis.star_yell} \`Репутация\`: 3.7 • 12 оценок
${emojis.balance} \`Баланс\`: Скоро`),
    )
    .setThumbnailAccessory(thumb => thumb.setURL("https://images-ext-1.discordapp.net/external/Pgg89Z8fyGPWp46CwwQSh1NWFejJIU4YpsGArxYTFvc/https/cdn.discordapp.com/avatars/628606966540926978/a_50d35d8c13e85d5772bb8a8666b41452.gif?width=141&height=141"))
  
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user} **Профиль клуба**
${emojis.dot_purp} Вы можете посмотреть как ваш профиль видят другие игроки
`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("btn:btn-1757277698792").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.connect_mix} **Подключения**
${emojis.dot_purp} Сопряжение аккаунтов с других платформ`),
    )
    .setButtonAccessory(btn => btn.setLabel("Перейти").setCustomId("embed:sub-1756733110144-nc0r").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.more_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.settings} **Настройки**
${emojis.dot_purp} Кастомизация баннера вашего профиля`),
    )
    .setButtonAccessory(btn => btn.setLabel("Перейти").setCustomId("btn:btn-1756739185071").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.more_purp.id }))
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})