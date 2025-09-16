// helpers for safe text
const __ensureStr = (v) => (typeof v === 'string' ? v : (v && v.toString ? v.toString() : String(v)));
const __clampText = (s) => { s = __ensureStr(s); return s.length > 1800 ? s.slice(0, 1800) : s; };

// Container: Media → Separator → Section(Text + Button accessory)
const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png")
    )
  )
  .addSeparatorComponents(separator => 
    separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large)
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(
      textDisplay => textDisplay.setContent(__clampText(`# Заголовок\n\nНовый текстовый блок.`))
    )
    .setButtonAccessory(
      button => button
        .setLabel("Кнопка")
        .setCustomId("btn:b1")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ id: emojis.crown_mix?.id, name: 'crown_mix', animated: !!emojis.crown_mix?.animated })
    )
  );

await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
});
