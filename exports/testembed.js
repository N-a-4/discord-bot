const exampleContainer = new ContainerBuilder()
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`**Demo**: секция с кнопкой справа`))
    .setButtonAccessory(btn => { return btn.setLabel("Открыть").setCustomId("btn:demo-open").setStyle(ButtonStyle.Secondary); })
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`Вторая секция, без миниатюры`))
    .setButtonAccessory(btn => { return btn.setLabel("Подробнее").setCustomId("btn:demo-more").setStyle(ButtonStyle.Secondary); })
  );

let selectRow;
let buttonsRow;

// Пустые строки для совместимости с рантаймом
selectRow = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId("select:demo")
    .setPlaceholder("Выберите раздел")
    .setOptions(
      { label: "Раздел A", value: "A" },
      { label: "Раздел B", value: "B" }
    )
);

buttonsRow = new ActionRowBuilder().addComponents(
  new ButtonBuilder().setLabel("Закрыть").setCustomId("btn:close").setStyle(ButtonStyle.Secondary)
);

await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, selectRow, buttonsRow]
});
