require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            await send(ctx, bot, locale.addCabinet.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            await User_state.update({action: 'addCabinet', param: 'number'}, {where: {id: ctx.from.id}})
            return await send(ctx, bot, locale.addCabinet.text, [
                [{text: locale.addCabinet.buttons.cancel, callback_data: `workerClearState`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addCabinet',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}