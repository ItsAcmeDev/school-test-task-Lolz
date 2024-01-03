require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, setStatus} = require('../../../Helpers/index');
const {User_state, Cabinet} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            await setStatus(ctx, bot, 'typing');
            if (/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(ctx.text) === false) {
                await send(ctx, bot, locale.addCabinet.handlerThree.notNumber, [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                return deleteLastMSG(ctx, bot, 2);
            }
            if (parseInt(ctx.text) < 0) {
                await send(ctx, bot, locale.addCabinet.handlerThree.notMinus, [[{text: locale.addCabinet.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx,bot, 2);
            }
            const userData = JSON.parse(ctx.user.data.state.data);
            userData.places = parseInt(ctx.text);
            await Cabinet.create({id: userData.id, floor: userData.floor, places: userData.places, heWorks: true, isDeleted: false});
            await User_state.update({action: '', param: '', data: ''}, {where: {id: ctx.from.id}});
            await send(ctx, bot, locale.addCabinet.handlerThree.emoji, []);
            await send(ctx, bot, locale.addCabinet.handlerThree.text, [
                [{text: locale.addCabinet.handlerThree.buttons.goToCabinet, callback_data: `cabinetMenu_${userData.id}`}]
            ]);
            return await deleteLastMSG(ctx,bot, 2);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addCabinetStateHandlerThree',
    type: 'state',
    state: 'addCabinet',
    param: 'places',
    isWork: true,
    file: `${__dirname}/${__filename}`
}