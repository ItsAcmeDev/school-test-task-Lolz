module.exports = async (ctx, bot, status) => {
    return await bot.sendChatAction(ctx.from.id, status)
}