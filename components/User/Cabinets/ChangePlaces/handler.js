require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, setStatus} = require('../../../Helpers/index');
const {User_state, Cabinet} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            await setStatus(ctx, bot, 'typing');
            if (/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(ctx.text) === false) {
                await send(ctx, bot, locale.changeCabinetPlaces.handler.notNumber, [[{text: locale.changeCabinetPlaces.buttons.cancel, callback_data: 'workerClearState'}]]);
                return deleteLastMSG(ctx, bot, 2);
            }
            if (parseInt(ctx.text) < 0) {
                await send(ctx, bot, locale.changeCabinetPlaces.handler.notMinus, [[{text: locale.changeCabinetPlaces.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx,bot, 2);
            }
            await Cabinet.update({places: parseInt(ctx.text)}, {where: {id: ctx.user.data.state.data}})
            await User_state.update({action: '', param: '', data: ''}, {where: {id: ctx.from.id}});
            await send(ctx, bot, locale.changeCabinetPlaces.handler.emoji, []);
            await send(ctx, bot, locale.changeCabinetPlaces.handler.text, [
                [{text: locale.changeCabinetPlaces.handler.buttons.goToCabinet, callback_data: `cabinetMenu_${ctx.user.data.state.data}`}]
            ]);
            return await deleteLastMSG(ctx,bot, 2);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'changeCabinetPlacesStateHandler',
    type: 'state',
    state: 'changeCabinetPlaces',
    isWork: true,
    file: `${__dirname}/${__filename}`
}