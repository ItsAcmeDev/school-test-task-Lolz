require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, setStatus} = require('../../../Helpers/index');
const {Cabinet} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, cabinetId) => {
        try {
            await setStatus(ctx, bot, 'typing');
            await Cabinet.update({isDeleted: true}, {where: {id: cabinetId}});
            await send(ctx, bot, locale.deleteLesson.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.deleteCabinet.cabinetDeleted(cabinetId), [
                    [{text: locale.deleteLesson.buttons.back, callback_data: `cabinetsList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'yesIWouldBeDeleteCabinet_number',
    type: 'regEx',
    regEx: /^yesIWouldBeDeleteCabinet_[0-9]+$/,
    extract: 'yesIWouldBeDeleteCabinet_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}