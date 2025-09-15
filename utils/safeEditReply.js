
// utils/safeEditReply.js
/**
 * Wraps interaction.editReply to log rich Discord API errors (validation paths etc.)
 */
export async function safeEditReply(interaction, payload) {
  try {
    return await interaction.editReply(payload);
  } catch (err) {
    const raw = err?.rawError || err;
    const details = {
      name: err?.name,
      message: err?.message,
      code: err?.code,
      rawError: raw,
      requestData: err?.requestData,
      stack: err?.stack?.split('\n').slice(0, 8).join('\n'),
    };
    // Pretty console dump
    console.error("[RUSTIFY DEBUG] editReply failed →", JSON.stringify(details, null, 2));
    // Try send a small visible hint (safe fallback)
    try {
      await interaction.followUp({ content: "❗ Ошибка рендера эмбеда. Подробности в консоли сервера.", ephemeral: true });
    } catch {}
    throw err; // rethrow for upstream
  }
}
