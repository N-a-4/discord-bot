export async function renderEmbed(interaction, deps){
  const { ContainerBuilder, MediaGalleryItemBuilder, ButtonBuilder, ButtonStyle, SeparatorSpacingSize, MessageFlags } = deps;
  const exampleContainer = new ContainerBuilder()
    .addMediaGalleryComponents(mediaGallery => mediaGallery
      .addItems(
        new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png?ex=689d27e1&is=689bd661&hm=0ba370ab75ace8478cbcc6c596b0dda51c9a9dc41b055f881c3ef83371f7e094&=&format=webp&quality=lossless&width=1100&height=330")
      )
    )
    .addActionRowComponents(row => row
      .addComponents(
        new ButtonBuilder().setLabel("HVG").setCustomId("btn:b1").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setLabel("Участники").setCustomId("btn:btn-1757834497946").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setLabel("Банк").setCustomId("btn:btn-1757834504642").setStyle(ButtonStyle.Secondary)
      )
    )
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`# Заголовок
  Это *пример* **текстового блока**`))
    .addActionRowComponents(row => row
      .addComponents(
        new ButtonBuilder().setLabel("Тест 1").setCustomId("btn:btn-1757834516052").setStyle(ButtonStyle.Secondary)
      )
    )
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`**Маркет**
  Приобретайте улучшения ваших баннеров`))
    .addActionRowComponents(row => row.addComponents(new ButtonBuilder().setLabel("Тест-кнопка").setCustomId("btn:btn-1757834523269").setStyle(ButtonStyle.Secondary)))
  
  await interaction.editReply({
    flags: MessageFlags.IsComponentsV2,
    components: [exampleContainer]
  })
}