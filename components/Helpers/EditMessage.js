module.exports = async (ctx, bot, text, buttons) => {
    try {
        return await bot.editMessageText(text, {
            chat_id: ctx.from.id,
            message_id: ctx.message.message_id,
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    ...buttons,
                ],
            }),
        });
    } catch (e) {

    }
}
