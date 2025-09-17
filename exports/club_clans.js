const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Кланы").setCustomId("btn:b1").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id }),
      new ButtonBuilder().setLabel("Игроки").setCustomId("embed:embed-1754859161245").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.user_2_mix.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_mix} **153. BiG** (Ваш клан)
-# ${emojis.rating} Рейтинг: 5.1 ${emojis['2user_gray']}29 игроков${emojis.mic_small_gray}453ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:embed-1754860281662").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_gold} **1. R2**
-# ${emojis.rating} Рейтинг: 7.1 ${emojis['2user_gray']}34 игрока${emojis.mic_small_gray}1403ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:embed-1754860281662#2").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_gray} **2. BiG**
-# ${emojis.rating} Рейтинг: 5.1 ${emojis['2user_gray']}29 игроков${emojis.mic_small_gray}453ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:embed-1754860281662#3").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_bronze} **3. GIVE**
-# ${emojis.rating} Рейтинг: 6.7 ${emojis['2user_gray']}30 игроков${emojis.mic_small_gray}591ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:embed-1754860281662#4").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_mix} **4. B8**
-# ${emojis.rating} Рейтинг: 6.7 ${emojis['2user_gray']}28 игроков${emojis.mic_small_gray}991ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:embed-1754860281662#5").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.crown_mix} **5. KICK**
-# ${emojis.rating} Рейтинг: 6.5 ${emojis['2user_gray']}14 игроков${emojis.mic_small_gray}481ч`),
    )
    .setButtonAccessory(btn => btn.setLabel("Открыть").setCustomId("embed:embed-1754860281662#6").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("btn:btn-1755074489605").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_left.id }),
      new ButtonBuilder().setLabel("1/157").setCustomId("btn:btn-1755074511456").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("btn:btn-1755074511876").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_right.id }),
      new ButtonBuilder().setLabel("Поиск").setCustomId("modal:m_eyj4ur7").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.search.id }),
      new ButtonBuilder().setCustomId("mini:mini-07atqp2").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.filter_yell.id })
    )
  )
  .addTextDisplayComponents(
    textDisplay => textDisplay
      .setContent('**Сортировка**: По рейтингу | За все время'),
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.favorite_mix} **Избранные**
${emojis.dot_gray} Список кланов, за которыми вы следите`),
    )
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("mini:mini-t7hogit").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.eye.id }))
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})