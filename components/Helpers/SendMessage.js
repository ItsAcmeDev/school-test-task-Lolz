module.exports = async (ctx, bot, text, buttons)=> {
    try {
        return await bot.sendMessage(ctx.from.id, text, {
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    ...buttons
                ],
            }),
        });
    } catch (e) {
        console.log(e)
    }
}