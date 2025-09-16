const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://images-ext-1.discordapp.net/external/Zo1cr39BcZ0zkE7QP9rHwQRfIrst12Amd0eXiSS3AU0/https/i.postimg.cc/sDLZy6wd/user-banner23.png?format=webp&quality=lossless&width=825&height=330")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("embed:sub-1755357504688-2489").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.back_purp.id }),
      new ButtonBuilder().setLabel("BiG").setCustomId("btn:btn-sbjro9").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_mix} **Клан**: **[BiG](https:///adasd.com/)**
${emojis.user_2_mix} **Игрок**: @username (\`.na4.\`)
${emojis.mic_small_gray} \`Общение\`: 364ч.
${emojis.game_small_gray} \`Наиграно\`: 145ч`),
    )
    .setThumbnailAccessory(thumb => thumb.setURL("https://i.ibb.co/m5Zj2zJf/ava-static.png"))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.lin1} **Пробыл**: 43 дня
${emojis.a2} **Причина ухода**: По собственному желанию`),
    )
    .setButtonAccessory(btn => btn.setLabel("Профиль клана").setCustomId("embed:embed-1754860281662").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id }))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addTextDisplayComponents(
    textDisplay => textDisplay
      .setContent('### Время пребывания на роли'),
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.role_mask_mix} **Фармер**
${emojis.dot_yell} Занимается добычей ресурсов для клана`),
    )
    .setButtonAccessory(btn => btn.setLabel("71 день").setCustomId("mini:mini-hfypr7z").setStyle(ButtonStyle.Secondary))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.role_mask_mix} **Электрик**
${emojis.dot_yell} Обустраивает базу всеми необходимыми электрическими системами`),
    )
    .setButtonAccessory(btn => btn.setLabel("36 дней").setCustomId("mini:mini-hfypr7z").setStyle(ButtonStyle.Secondary))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.role_mask_mix} **Билдер**
${emojis.dot_yell} Отвечает за проектирование, строительство и укрепление базы клана`),
    )
    .setButtonAccessory(btn => btn.setLabel("4 дня").setCustomId("mini:mini-hfypr7z").setStyle(ButtonStyle.Secondary))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.role_mask_mix} **Фермер**
${emojis.dot_yell} Обеспечивает клан стабильным ресурсом еды и трав`),
    )
    .setButtonAccessory(btn => btn.setLabel("0 дней").setCustomId("btn:btn-1757942268834").setStyle(ButtonStyle.Secondary))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("btn:btn-1757947448828").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_left.id }),
      new ButtonBuilder().setLabel("1/2").setCustomId("btn:btn-1757947454918").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("btn:btn-1757947476176").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_right.id })
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Роли").setCustomId("btn:btn-1757942491316").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.role_mask_mix.id }),
      new ButtonBuilder().setLabel("Должности").setCustomId("mini:mini-hfypr7z").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.case_mix.id })
    )
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})