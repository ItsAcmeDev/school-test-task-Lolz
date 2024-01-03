module.exports = async (ctx, bot) => {
    try {
        return await bot.deleteMessage(ctx.from.id, ctx.message.message_id);
    } catch (e) {
        
    }
}