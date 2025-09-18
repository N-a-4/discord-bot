const exampleContainer = new ContainerBuilder()
  .addTextDisplayComponents(
    textDisplay => textDisplay
      .setContent(`${emojis.info_yell} Для получения **ежедневного бонуса** вы должны быть участником дискорда ${emojis.fire_purp}**[Rustify](https://discord.gg/rustify)**`),
  )
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer]
})