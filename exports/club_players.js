const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Клан").setCustomId("embed:embed-1754855220162").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id }),
      new ButtonBuilder().setLabel("Игроки").setCustomId("btn:btn-1754859186686").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user_2_mix.id }).setDisabled(true)
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user_2_mix} **55. Na4** (Вы)
-# ${emojis.star_small_yell} 3.7 (74 оценка)${emojis.mic_small_gray}143ч ${emojis.game_small_gray}3621ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Профиль").setCustomId("embed:sub-1754934351776-8h96").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user.id }))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user_2_mix} **1. Armagedon | Михаил**
-# ${emojis.star_small_yell} 4.2 (173 оценки)${emojis.mic_small_gray}34ч ${emojis.game_small_gray}5342ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Профиль").setCustomId("embed:sub-1754934351776-8h96#2").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user_2_mix} **2. alore. / Lizka 11h dayn**
-# ${emojis.star_small_yell} 3.1 (116 оценок)${emojis.mic_small_gray}5313ч ${emojis.game_small_gray}0ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Профиль").setCustomId("embed:sub-1754934351776-8h96#3").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user_2_mix} **3. кНига-book | Vladik**
-# ${emojis.star_small_yell} 3.8 (89 оценок)${emojis.mic_small_gray}48ч ${emojis.game_small_gray}2813ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Профиль").setCustomId("embed:sub-1754934351776-8h96#4").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user_2_mix} **4. RAMP**
-# ${emojis.star_small_yell} 4.4 (81 оценка)${emojis.mic_small_gray}181ч ${emojis.game_small_gray}1854ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Профиль").setCustomId("embed:sub-1754934351776-8h96#5").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.user_2_mix} **5. ! Рататуй**
-# ${emojis.star_small_yell} 4.7 (74 оценки)${emojis.mic_small_gray}937ч ${emojis.game_small_gray}3193ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Профиль").setCustomId("embed:sub-1754934351776-8h96#6").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user.id }))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("btn:btn-1754861533006").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_left.id }).setDisabled(true),
      new ButtonBuilder().setLabel("1/157").setCustomId("btn:btn-1754861563538").setStyle(ButtonStyle.Secondary).setDisabled(true),
      new ButtonBuilder().setCustomId("btn:btn-1754861580945").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_right.id }),
      new ButtonBuilder().setLabel("Поиск").setCustomId("modal:m_0w97ljz").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.search.id }),
      new ButtonBuilder().setCustomId("mini:mini-pmfms78").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.filter_yell.id })
    )
  )
  .addTextDisplayComponents(
    textDisplay => textDisplay
      .setContent('**Сортировка**: По репутации | За все время'),
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.favorite_mix} **Друзья**
${emojis.dot_gray} Ваши друзья, которые уже есть в Rustify`),
    )
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("btn:btn-1755990164261").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id }))
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})