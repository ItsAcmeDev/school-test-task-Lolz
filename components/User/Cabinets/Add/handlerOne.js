require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state, Cabinet} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            if (/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(ctx.text) === false) {
                await send(ctx, bot, locale.addCabinet.handlerOne.notNumber, [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                return deleteLastMSG(ctx, bot, 2);
            }
            const tryFindCabinet = await Cabinet.findOne({where: {id: ctx.text}});
            if (!tryFindCabinet) {
                if (parseInt(ctx.text) < 0) {
                    await send(ctx, bot, locale.addCabinet.handlerOne.notMinus, [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                    return await deleteLastMSG(ctx,bot, 2);
                }
                await User_state.update({action: 'addCabinet', param: 'floor', data: JSON.stringify({id: ctx.text})}, {where: {id: ctx.from.id}});
                await send(ctx, bot, locale.addCabinet.handlerOne.text(ctx.text), [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx,bot, 2);
            } else {
                await send(ctx, bot, locale.addCabinet.handlerOne.cabinetAlreadyExist, [
                    [{text: locale.addCabinet.buttons.cancel, callback_data: `workerClearState`}]
                ]);
                return await deleteLastMSG(ctx,bot, 2);
            }
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addCabinetStateHandlerOne',
    type: 'state',
    state: 'addCabinet',
    param: 'number',
    isWork: true,
    file: `${__dirname}/${__filename}`
}