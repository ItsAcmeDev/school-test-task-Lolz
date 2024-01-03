module.exports = async (ctx, bot, text, alert = false) => {
    return await bot.answerCallbackQuery(ctx.id, {
        text: text,
        show_alert: alert
    })
}