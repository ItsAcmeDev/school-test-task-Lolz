const locale = require('../../locale').default, sendMessage = require('../Helpers/SendMessage');
const {User_state} = require("../../sequelize");

module.exports = async (ctx, bot) => {
    try {
        await User_state.update({action: '',parameter: '',data: ''}, {where: {userId: ctx.from.id}});
        return await sendMessage(ctx, bot, locale.clearState.text, [[{text: locale.clearState.buttons.backToMenu, callback_data: 'menu'}]]);
    } catch (e) {
        return await sendMessage(ctx, bot, locale.errorMessage.text, []);
    }
}