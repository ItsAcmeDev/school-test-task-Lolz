require('dotenv').config();
const locale = require('../../../../locale').default;
const {edit, answerCallbackQuery} = require('../../../Helpers/index');
const {User_state, EducationActivity, PropertyLesson} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, markLessonId) => {
        try {
            if (ctx.user.data.state.action === 'addTeacher' && ctx.user.data.state.param === 'specialization') {
                ctx.user.data.state.data.specialization.push(parseInt(markLessonId))
                const allLessons = await EducationActivity.findAll({
                    include: [{
                        model: PropertyLesson,
                        where: {
                            isActive: true
                        },
                        include: [],
                        as: 'property_lesson'
                    }],
                });
                const buttons = [];
                for (const lesson of allLessons) {
                    let exist = false
                    for (const markLesson of ctx.user.data.state.data.specialization) {
                        if (lesson.dataValues.id === markLesson) {
                            exist = true
                        }
                    }
                    const lessonTitle = lesson.dataValues.title;
                    if (exist === true) {
                        buttons.push([{
                            text: `• ${lessonTitle} •`,
                            callback_data: `UnmarkASubject_${lesson.dataValues.id}`
                        }])
                    } else {
                        buttons.push([{
                            text: lessonTitle,
                            callback_data: `MarkASubject_${lesson.dataValues.id}`
                        }])
                    }
                }
                buttons.push([{
                    text: locale.addTeacher.handlerTwo.buttons.next,
                    callback_data: 'nextStepAddingTeacher'
                }],[{
                    text: locale.addTeacher.buttons.cancel,
                    callback_data: 'workerClearState'
                }])
                await User_state.update({
                    action: 'addTeacher',
                    param: 'specialization',
                    data: JSON.stringify(ctx.user.data.state.data)
                }, {where: {id: ctx.from.id}});
                return await edit(ctx, bot, locale.addTeacher.handlerTwo.text(ctx.user.data.state.data.id, ctx.user.data.state.data.experience), [...buttons]);
            }
            return await answerCallbackQuery(ctx, bot, '❌ Пожалуйста, добавьте учителя заного!', true);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'MarkASubject_number',
    type: 'regEx',
    regEx: /^MarkASubject_[0-9]+$/,
    extract: 'MarkASubject_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}