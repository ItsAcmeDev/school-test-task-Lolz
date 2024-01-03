require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, setStatus} = require('../../../Helpers/index');
const {TimeSchedule} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, scheduleId) => {
        try {
            await setStatus(ctx, bot, 'typing');
            await TimeSchedule.update({isActive: false}, {where: {id: scheduleId}});
            await send(ctx, bot, locale.deleteSchedule.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.deleteSchedule.scheduleDeleted, [
                    [{text: locale.deleteSchedule.buttons.back, callback_data: `scheduleList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'yesIWouldBeDeleteSchedule_number',
    type: 'regEx',
    regEx: /^yesIWouldBeDeleteSchedule_[0-9]+$/,
    extract: 'yesIWouldBeDeleteSchedule_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}