module.exports = async (ctx, bot, count = 0) => {
    try {
        while (count >= 0) {
            try {
                await bot.deleteMessage(ctx.from.id, ctx.message.message_id - count);
            } catch (e) {
                try {
                    await bot.deleteMessage(ctx.from.id, ctx.message_id - count);
                } catch (e) {

                }
            }
            count = count - 1;
        }
        return
    } catch (e) {
        
    }
}