require('dotenv').config();
const locale = require('../../locale').default;
const {deleteLastMSG, send} = require('../Helpers');
const {User_state} = require('../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            await User_state.update({action: '', param: '', data: ''}, {where: {id: ctx.from.id}})
            await send(ctx, bot, locale.clearState.text, [[{text: locale.clearState.buttons.backToMenu, callback_data: 'mainMenu'}]]);
            return await deleteLastMSG(ctx, bot, 1)
        } catch (e) {

        }
    },
    callBack: 'workerClearState',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}