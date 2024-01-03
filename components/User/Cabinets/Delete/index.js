require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');

module.exports = {
    function: async (ctx, bot, cabinetId) => {
        try {
            await send(ctx, bot, locale.deleteCabinet.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.deleteCabinet.text, [
                [{text: locale.deleteCabinet.buttons.no, callback_data: `cabinetMenu_${cabinetId}`},
                    {text: locale.deleteCabinet.buttons.yes, callback_data: `yesIWouldBeDeleteCabinet_${cabinetId}`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'confirmDeleteCabinet_number',
    type: 'regEx',
    regEx: /^confirmDeleteCabinet_[0-9]+$/,
    extract: 'confirmDeleteCabinet_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}