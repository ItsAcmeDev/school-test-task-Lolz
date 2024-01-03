require('dotenv').config();
const locale = require('../../../locale').default;
const {send, deleteLastMSG} = require('../../Helpers/index');
const {PropertyLesson, EducationActivity} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot, lessonId) => {
        try {
            const lesson = await EducationActivity.findOne({where: {
                id: lessonId
                }, include: [{
                    model: PropertyLesson,
                    attributes: ['duration'],
                    as: 'property_lesson'
                }]});
            await send(ctx, bot, locale.lessonMenu.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.lessonMenu.text(lesson.dataValues.title, lesson.dataValues['property_lesson'].dataValues.duration), [
                [{text: locale.lessonMenu.buttons.editDuration, callback_data: `editLessonDuration_${lessonId}`},
                    {text: locale.lessonMenu.buttons.delete, callback_data: `confirmDeleteLesson_${lessonId}`}],
                [{text: locale.lessonMenu.buttons.back, callback_data: `lessonsList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'lessonMenu_number',
    type: 'regEx',
    regEx: /^lessonMenu_[0-9]+$/,
    extract: 'lessonMenu_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}