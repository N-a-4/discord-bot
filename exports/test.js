const exampleContainer = new ContainerBuilder()
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
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.crown_mix} **Клан**: **[BiG](https:///adasd.com/)**
${emojis.a2} **Должность**: Заместитель`))
    .setButtonAccessory(btn => btn.setLabel("Профиль клана").setCustomId("embed:embed-1754860281662").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id }))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`### Клановая активность
${emojis.mic_small_purple} **Общение с кланом**: 315ч.
${emojis.dot_yell} \`За 7 дней\`: 65ч.
${emojis.dot_yell} \`За 30 дней\`: 161ч.

${emojis.gamepad_small_purple} **Наиграно в RUST**: 0ч.
${emojis.dot_yell} \`За 7 дней\`: 0ч.
${emojis.dot_yell} \`За 30 дней\`: 0ч.`))
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
${emojis.dot_gray} Боевые показатели игрока`))
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("embed:sub-1755374150209-io3o").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.report} **Жалобы**
${emojis.dot_gray} Просмотр нарушений и создание жалоб`))
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("embed:embed-mefmj95w-kyz4n").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id }))
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})