require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');

module.exports = {
    function: async (ctx, bot, scheduleId) => {
        try {
            await send(ctx, bot, locale.deleteSchedule.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.deleteSchedule.text, [
                [{text: locale.deleteSchedule.buttons.no, callback_data: `scheduleMenu_${scheduleId}`},
                    {text: locale.deleteSchedule.buttons.yes, callback_data: `yesIWouldBeDeleteSchedule_${scheduleId}`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'confirmDeleteSchedule_number',
    type: 'regEx',
    regEx: /^confirmDeleteSchedule_[0-9]+$/,
    extract: 'confirmDeleteSchedule_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}