const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png?ex=689d27e1&is=689bd661&hm=0ba370ab75ace8478cbcc6c596b0dda51c9a9dc41b055f881c3ef83371f7e094&=&format=webp&quality=lossless&width=1100&height=330")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Кнопка").setCustomId("btn:b1").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id })
    )
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.like} **Лайки** (124)
${emojis.dot_gray} Проверка работы блока`))
    .setButtonAccessory(btn => btn.setLabel("Перейти").setCustomId("btn:btn-1758034841531").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis["3score"].id }))
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  content: null,
  embeds: null,
  stickers: null,
  poll: null,
  components: [exampleContainer]
})