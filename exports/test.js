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
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
	
  
  
  .addTextDisplayComponents(
		textDisplay => textDisplay
			.setContent('### Партнерства'),
	)




  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`${emojis.fire_purp} **Rustify** только выходит на арену, но мы уже готовим почву для мощных альянсов. Партнёрства — это вопрос времени, и мы точно знаем: впереди будет только жарче!`))
    .setButtonAccessory(btn => btn.setLabel("148").setCustomId("btn:btn-1758036551909").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.like.id }))
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Общее").setCustomId("btn:btn-1758042422163").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setLabel("RUST").setCustomId("btn:btn-1758042433810").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setLabel("UKN ?").setCustomId("btn:btn-1758042438091").setStyle(ButtonStyle.Secondary)
    )
  )



  module.exports = {
    // data: new SlashCommandBuilder()...
    async execute(interaction) {
      const target = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') ?? 'No reason provided';
  
      const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Confirm Ban')
        .setStyle(ButtonStyle.Danger);
  
      const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary);
  
      const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);
  
      await interaction.reply({
        content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
        components: [row],
      });
    },
  };



  
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})