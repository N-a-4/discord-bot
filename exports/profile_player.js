const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://images-ext-1.discordapp.net/external/Zo1cr39BcZ0zkE7QP9rHwQRfIrst12Amd0eXiSS3AU0/https/i.postimg.cc/sDLZy6wd/user-banner23.png?format=webp&quality=lossless&width=825&height=330")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("embed:embed-1754855220162").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.back_purp.id }),
      new ButtonBuilder().setLabel("BiG").setCustomId("btn:btn-p1y0gb").setStyle(ButtonStyle.Secondary).setDisabled(true),
      new ButtonBuilder().setLabel("Участники").setCustomId("embed:sub-1754942674709-psz9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.members_mix.id })
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
        .setContent(`${emojis.bigdot_yell} **Набор открыт**
${emojis.dot_yell} Клан принимает заявки на вступление`),
    )
    .setButtonAccessory(btn => btn.setLabel("Discord").setCustomId("mini:mini-g33re7j").setStyle(ButtonStyle.Link))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`### Игровые показатели
${emojis.kd_mix} \`KDR\`: 0.65
${emojis.headshot_mix} \`Хэдшоты\`: 30%
${emojis.helping_purp} \`Воскрешений\`: 295
${emojis.bullet_mix} \`Точность\`: 13%
${emojis.info_yell} Важно понимать, что игроки без подключённого Steam-аккаунта искажают общий результат`),
    )
    .setThumbnailAccessory(thumb => thumb.setURL("https://cdn.discordapp.com/emojis/1351058159879589950.webp?size=128&animated=true"))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Общее").setCustomId("embed:embed-1754860281662").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setLabel("RUST").setCustomId("btn:btn-onb5q5").setStyle(ButtonStyle.Secondary).setDisabled(true),
      new ButtonBuilder().setLabel("UKN ?").setCustomId("mini:mini-2y3h3ho").setStyle(ButtonStyle.Secondary)
    )
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