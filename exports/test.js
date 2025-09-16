const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://images-ext-1.discordapp.net/external/Zo1cr39BcZ0zkE7QP9rHwQRfIrst12Amd0eXiSS3AU0/https/i.postimg.cc/sDLZy6wd/user-banner23.png?format=webp&quality=lossless&width=825&height=330")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("embed:sub-1755357504688-2489").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.back_purp.id }),
      new ButtonBuilder().setLabel("BiG").setCustomId("btn:btn-1tzbrb").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.crown_mix} **Клан**: **[BiG](https:///adasd.com/)**
${emojis.user_2_mix} **Игрок**: @username (\`.na4.\`)
${emojis.mic_small_gray} \`Общение\`: 364ч.
${emojis.game_small_gray} \`Наиграно\`: 145ч`))
    .setThumbnailAccessory(thumb => thumb.setURL("https://i.ibb.co/m5Zj2zJf/ava-static.png"))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.lin1} **Пробыл**: 43 дня
${emojis.a2} **Причина ухода**: По собственному желанию`))
    .setButtonAccessory(btn => btn.setLabel("Профиль клана").setCustomId("embed:embed-1754860281662").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id }))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`### Время пребывания на должностях`))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.case_mix} **Глава клана**
${emojis.dot_purp} Руководит кланом, принимает ключевые решения`))
    .setButtonAccessory(btn => btn.setLabel("0 дней").setCustomId("btn:btn-1756053395927").setStyle(ButtonStyle.Secondary))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.case_mix} **Заместитель**
${emojis.dot_purp} Помогает Главе управлять кланом и принимает решения в его отсутствии`))
    .setButtonAccessory(btn => btn.setLabel("0 дней").setCustomId("btn:btn-1756053621278").setStyle(ButtonStyle.Secondary))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Роли").setCustomId("mini:mini-cnwhrpj").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.role_mask_mix.id }),
      new ButtonBuilder().setLabel("Должности").setCustomId("btn:btn-1757941770768").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.case_mix.id })
    )
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, selectRow, buttonsRow]
})