require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, cabinetId) => {
        try {
            await send(ctx, bot, locale.changeCabinetPlaces.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            await User_state.update({action: 'changeCabinetPlaces', data: cabinetId}, {where: {id: ctx.from.id}})
            return await send(ctx, bot, locale.changeCabinetPlaces.text, [
                [{text: locale.addCabinet.buttons.cancel, callback_data: `workerClearState`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'changePlacesCabinet_number',
    type: 'regEx',
    regEx: /^changePlacesCabinet_[0-9]+$/,
    extract: 'changePlacesCabinet_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}