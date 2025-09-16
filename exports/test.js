// helpers for safe text
const __ensureStr = (v) => (typeof v === 'string' ? v : (v && v.toString ? v.toString() : String(v)));
const __clampText = (s) => { s = __ensureStr(s); return s.length > 1800 ? s.slice(0, 1800) : s; };

// container
const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png?ex=689d27e1&is=689bd661&hm=0ba370ab75ace8478cbcc6c596b0dda51c9a9dc41b055f881c3ef83371f7e094&=&format=webp&quality=lossless&width=1100&height=330")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder()
        .setLabel("Кнопка")
        .setCustomId("btn:b1")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ id: emojis.crown_mix.id })
    )
  )
  .addSeparatorComponents(separator => 
    separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large)
  )
  .addSectionComponents(section => 
    section.addTextDisplayComponents(
      textDisplay => textDisplay.setContent(__clampText(`# Заголовок

Новый текстовый блок.`))
    )
  );

await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
});
