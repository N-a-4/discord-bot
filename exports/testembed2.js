const exampleContainer = new ContainerBuilder()
  .addMediaGalleryComponents(mediaGallery => mediaGallery
    .addItems(
      new MediaGalleryItemBuilder().setURL("https://i.ibb.co/gM3ZJYGt/vidget.png")
    )
  )
  .addActionRowComponents(row => row
    .addComponents(
      new ButtonBuilder().setLabel("Общие правила").setCustomId("btn:btn-1756053696332").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.anketa_mix.id }),
      new ButtonBuilder().setLabel("Кланы").setCustomId("mini:mini-hvwkwje").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.crown_mix.id })
    )
  )
  .addSeparatorComponents(separator => separator.setDivider(true).setSpacing(SeparatorSpacingSize.Large))
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`### **Общие правила**`))
  )
  .addSectionComponents(section => section
    .addTextDisplayComponents(textDisplay => textDisplay.setContent(`**${emojis.bigdot_purp} 1. Использование / распространение читов**
${emojis.dot_purp} Запрещено использование стороннего софта, скриптов и любых методов нечестной игры. Также под запретом помощь в распространении или реклама таких программ.
${emojis.report} **Наказание**: Блокировка на 365 дней (1 год)
ㅤ
**${emojis.bigdot_purp} 2. Мошенничество и скам**
${emojis.dot_purp} Категорически запрещены любые действия, направленные на обман игроков: попытки получить доступ к их аккаунтам, установку подозрительных программ под видом проверки на читы, передачу фишинговых ссылок или выманивание личных данных.
-# ${emojis.dot_gray} Кланы и игроки, уличённые в подобной деятельности, получат немедленный бан быстрее чем успеют сказать \`«это пранк»\`
${emojis.report} **Наказание**: Блокировка навсегда
ㅤ
**${emojis.bigdot_purp} 3. Манипуляции с системой Rustify**
${emojis.dot_purp} Попытки искусственно накрутить репутацию, активность или другие показатели строго запрещены.
${emojis.report} **Наказание**: Временное понижение рейтинга или блокировка.

${emojis.info_yell} Администрация оставляет за собой право выдать наказание по причине, не указанной здесь, а также изменять срок/тяжесть наказания в зависимости от ситуации. По этому всегда руководствуйтесь здравым смыслом и не пытайтесь обойти правила прибегая к хитростям.`))
    .setButtonAccessory(btn => { return btn.setLabel("148").setCustomId("btn:btn-1757952597917").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.ok.id }); })
  )
let selectRow;
let buttonsRow;
// buttonsRow
  buttonsRow = new ActionRowBuilder();
  buttonsRow.addComponents(new ButtonBuilder().setLabel("Закрыть").setCustomId("embed:embed-1754855196673").setStyle(ButtonStyle.Secondary).setEmoji({ id: emojis.cross_purp.id }));
await interaction.editReply({
  flags: MessageFlags.IsComponentsV2,
  components: [exampleContainer, buttonsRow]
})