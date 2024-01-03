require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');

module.exports = {
    function: async (ctx, bot, cabinetId) => {
        try {
            await send(ctx, bot, locale.deleteTeacher.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.deleteTeacher.text, [
                [{text: locale.deleteTeacher.buttons.no, callback_data: `teacherMenu_${cabinetId}`},
                    {text: locale.deleteTeacher.buttons.yes, callback_data: `yesIWouldBeDeleteTeacher_${cabinetId}`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'confirmDeleteTeacher_number',
    type: 'regEx',
    regEx: /^confirmDeleteTeacher_[0-9]+$/,
    extract: 'confirmDeleteTeacher_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}