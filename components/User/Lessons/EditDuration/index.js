require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, lessonId) => {
        try {
            await send(ctx, bot, locale.editLessonDuration.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            await User_state.update({action: 'editLessonDuration', data: lessonId}, {where: {id: ctx.from.id}})
            return await send(ctx, bot, locale.editLessonDuration.text, [
                [{text: locale.editLessonDuration.buttons.cancel, callback_data: `workerClearState`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'editLessonDuration_number',
    type: 'regEx',
    regEx: /^editLessonDuration_[0-9]+$/,
    extract: 'editLessonDuration_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}