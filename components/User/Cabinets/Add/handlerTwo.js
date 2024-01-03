require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            if (/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(ctx.text) === false) {
                await send(ctx, bot, locale.addCabinet.handlerTwo.notNumber, [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                return deleteLastMSG(ctx, bot, 2);
            }
            if (parseInt(ctx.text) > 10) {
                await send(ctx, bot, locale.addCabinet.handlerTwo.floorNotFound, [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx,bot, 2);
            }
            if (parseInt(ctx.text) < 0) {
                await send(ctx, bot, locale.addCabinet.handlerTwo.notMinus, [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx,bot, 2);
            }
            const userData = JSON.parse(ctx.user.data.state.data);
            userData.floor = parseInt(ctx.text);
            await User_state.update({action: 'addCabinet', param: 'places', data: JSON.stringify(userData)}, {where: {id: ctx.from.id}});
            await send(ctx, bot, locale.addCabinet.handlerTwo.text(userData.id, userData.floor), [
                [{text: locale.addCabinet.buttons.cancel, callback_data: `workerClearState`}]
            ]);
            return await deleteLastMSG(ctx,bot, 2);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addCabinetStateHandlerTwo',
    type: 'state',
    state: 'addCabinet',
    param: 'floor',
    isWork: true,
    file: `${__dirname}/${__filename}`
}