const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://rustify.s3.eu-central-003.backblazeb2.com/web_banner_2.gif")
    )
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`### Поддержка
${emojis.info_yell} Если у вас возникли **трудности с освоением** функционала либо иной **другой вопрос**, связанный с проектом **Rustify** — наша **служба поддержки** всегда готова вам помочь!`),
    )
    .setThumbnailAccessory(thumb => thumb.setURL("https://cdn.discordapp.com/emojis/1395320346869104721.webp?size=128&animated=true"))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Задать вопрос").setCustomId("modal:m_lqwqxe6").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.chat.id }),
      new ButtonBuilder().setLabel("Жалоба").setCustomId("mini:mini-tl1tc1a").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.report.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addTextDisplayComponents(
    textDisplay => textDisplay
      .setContent('### Ваши обращения'),
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.chat} **Вопрос #571**
${emojis.dot_yell} Тикет открыт: \`26/04/25\``),
    )
    .setButtonAccessory(btn => btn.setLabel("Перейти").setCustomId("btn:btn-8hmf0g").setStyle(ButtonStyle.Link).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.report} **Жалоба #184**
${emojis.dot_red} Тикет открыт: \`26/04/25\``),
    )
    .setButtonAccessory(btn => btn.setLabel("Перейти").setCustomId("btn:btn-1755349286038").setStyle(ButtonStyle.Link).setEmoji({ id: emojis.bigdot_purp.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.chat} **Вопрос #571**
${emojis.dot_yell} Тикет закрыт: \`03/03/25\``),
    )
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("btn:btn-859w4x").setStyle(ButtonStyle.Link).setEmoji({ id: emojis.eye.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.chat} **Вопрос #341**
${emojis.dot_yell} Тикет закрыт: \`14/01/25\``),
    )
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("btn:btn-1755349361324").setStyle(ButtonStyle.Link).setEmoji({ id: emojis.eye.id }))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay
        .setContent(`${emojis.report} **Жалоба #184**
${emojis.dot_red} Тикет закрыт: \`18/12/24\``),
    )
    .setButtonAccessory(btn => btn.setLabel("Смотреть").setCustomId("btn:btn-1755349436524").setStyle(ButtonStyle.Link).setEmoji({ id: emojis.eye.id }))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setCustomId("btn:btn-1755349547999").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_left.id }).setDisabled(true),
      new ButtonBuilder().setLabel("1/2").setCustomId("btn:btn-1755349612507").setStyle(ButtonStyle.Secondary).setDisabled(true),
      new ButtonBuilder().setCustomId("btn:btn-1755349612940").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.arrow_yell_right.id })
    )
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})