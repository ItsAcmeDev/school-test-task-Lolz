const locale = require('../../locale').default, sendMessage = require('../Helpers/SendMessage');

module.exports = async (ctx, bot) => {
    try {
        return await sendMessage(ctx, bot, locale.IDoNotUnderstand, []);
    } catch (e) {
        return await sendMessage(ctx, bot, locale.errorMessage.text, []);
    }
}