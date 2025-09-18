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
  .addActionRowComponents(row => row
    .addComponents(
      new StringSelectMenuBuilder().setCustomId("list-qqvoe2").setPlaceholder("Проверка").addOptions({ label: "Вариант 1", value: "вариант_1", description: "Test1", emoji: { id: emojis.crown_mix.id } }, { label: "Вариант 2", value: "вариант_2", description: "Test2", emoji: { id: emojis.user.id } }, { label: "Вариант 3", value: "вариант_3", description: "Test3", emoji: { id: emojis.report.id } })
    )
  )
let selectRow;
let buttonsRow;
// selectRow
  selectRow = new ActionRowBuilder();
  const sel = new StringSelectMenuBuilder().setCustomId("f-list-464q23").setPlaceholder("Выберите вариант").addOptions({ label: "Вариант 1", value: "вариант_1" }, { label: "Вариант 2", value: "вариант_2" }, { label: "Вариант 3", value: "вариант_3" });
  selectRow.addComponents(sel);
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, selectRow, buttonsRow].filter(Boolean)
})