const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://images-ext-1.discordapp.net/external/Zo1cr39BcZ0zkE7QP9rHwQRfIrst12Amd0eXiSS3AU0/https/i.postimg.cc/sDLZy6wd/user-banner23.png?format=webp&quality=lossless&width=825&height=330")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("BiG").setCustomId("btn:btn-1754860305089").setStyle(ButtonStyle.Secondary).setDisabled(true),
      new ButtonBuilder().setLabel("Участники").setCustomId("embed:sub-1754942674709-psz9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.members_mix.id }),
      new ButtonBuilder().setLabel("Группы").setCustomId("btn:btn-1758118590500").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.clanstaff.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_mix} **Клан**: **[BiG](https:///adasd.com/)**
${emojis.members} \`Состав\`: 36 игроков
${emojis.rating} \`Рейтинг\`: [ 6.8 / 10.0 ]
${emojis.bank} \`Банк\`: Скоро`),
    )
    .setThumbnailAccessory(thumb => thumb.setURL("https://i.ibb.co/m5Zj2zJf/ava-static.png"))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.bigdot_yell} **Голосовое общение**
${emojis.dot_yell} Основная комната для переговоров`),
    )
    .setButtonAccessory(btn => btn.setLabel("Подключиться").setCustomId("mini:mini-g33re7j").setStyle(ButtonStyle.Link))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.report} **Жалобы**
${emojis.dot_gray} Просмотр нарушений и создание жалоб`),
    )
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("embed:sub-1754888253581-wld8").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.book} **Детали**
${emojis.dot_gray} Дополнительная информация о клане`),
    )
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("embed:sub-1754931026881-i62z").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id }))
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})