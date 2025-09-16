const __setEmojiIf=(b,id)=>id?b.setEmoji({id}):b;
const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png?ex=689d27e1&is=689bd661&hm=0ba370ab75ace8478cbcc6c596b0dda51c9a9dc41b055f881c3ef83371f7e094&=&format=webp&quality=lossless&width=1100&height=330")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Кнопка").setCustomId("btn:b1").setStyle(ButtonStyle.Secondary)
    )
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`# Заголовок

Это *пример* **текстового блока**`))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`# Заголовок

Текст с кнопкой справа.`))
    .setButtonAccessory(btn => btn.setLabel("ПРОВЕРКА КНОПКИ").setCustomId("btn:btn-1758026630664").setStyle(ButtonStyle.Secondary))
  )
let selectRow;
let buttonsRow;
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})