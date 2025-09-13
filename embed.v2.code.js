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
        new ButtonBuilder().setLabel("Кнопка").setCustomId("btn:b1").setStyle(ButtonStyle.Secondary)
      )
    )
    .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`# Заголовок
  
  Это *пример* **текстового блока**`))
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`# Заголовок
  
  Текст с кнопкой справа.`))
    .addActionRowComponents(row => row.addComponents(new ButtonBuilder().setLabel("Кнопка").setCustomId("btn:btn-1757794900794").setStyle(ButtonStyle.Secondary)))
  
  { // selectRow
    const selectRow = new ActionRowBuilder();
    const sel = new StringSelectMenuBuilder().setCustomId("select").setPlaceholder("TEST").setOptions({ label: "Вариант 1", value: "вариант_1" }, { label: "Вариант 2", value: "вариант_2" }, { label: "Вариант 3", value: "вариант_3" });
    selectRow.addComponents(sel);
  }
  { // buttonsRow
    const buttonsRow = new ActionRowBuilder();
    buttonsRow.addComponents(new ButtonBuilder().setLabel("Кнопка").setCustomId("btn:btn-1757794881647").setStyle(ButtonStyle.Secondary));
  }
  await interaction.editReply({
    flags: MessageFlags.IsComponentsV2,
    components: [exampleContainer, selectRow, buttonsRow]
  })
}