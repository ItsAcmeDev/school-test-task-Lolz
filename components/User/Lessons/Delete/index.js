require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');

module.exports = {
    function: async (ctx, bot, lessonId) => {
        try {
            await send(ctx, bot, locale.deleteLesson.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.deleteLesson.text, [
                [{text: locale.deleteLesson.buttons.no, callback_data: `lessonMenu_${lessonId}`},
                    {text: locale.deleteLesson.buttons.yes, callback_data: `yesIWouldBeDeleteLesson_${lessonId}`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'confirmDeleteLesson_number',
    type: 'regEx',
    regEx: /^confirmDeleteLesson_[0-9]+$/,
    extract: 'confirmDeleteLesson_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}