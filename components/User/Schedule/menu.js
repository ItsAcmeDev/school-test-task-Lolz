require('dotenv').config();
const locale = require('../../../locale').default;
const {send, deleteLastMSG} = require('../../Helpers/index');
const {PropertyLesson, EducationActivity, TimeSchedule, Teacher, User, Cabinet} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot, scheduleId) => {
        try {
            const schedule = await TimeSchedule.findByPk(scheduleId, {
                include: [{
                    model: Teacher,
                    attributes: ['id'],
                    include: {
                        model: User,
                        attributes: ['firstName'],
                        as: 'id_user'
                    },
                    as: 'teacher_teacher'
                }, {
                    model: Cabinet,
                    attributes: ['id', 'places', 'floor'],
                    as: 'cabinet_cabinet'
                }, {
                    model: EducationActivity,
                    attributes: ['title'],
                    include: [{
                        model: PropertyLesson,
                        as: 'property_lesson'
                    }],
                    as: 'lesson_education_activity'
                }]
            });
            console.log(schedule.dataValues)
            await send(ctx, bot, locale.scheduleMenu.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.scheduleMenu.text(
                schedule.dataValues['lesson_education_activity'].dataValues.title,
                schedule.dataValues['lesson_education_activity'].dataValues['property_lesson'].duration,
                schedule.dataValues['cabinet_cabinet'].dataValues.id,
                schedule.dataValues['cabinet_cabinet'].dataValues.floor,
                schedule.dataValues['cabinet_cabinet'].dataValues.places,
                schedule.dataValues['teacher_teacher'].dataValues['id_user'].firstName,
            ), [
                [{text: locale.scheduleMenu.buttons.delete, callback_data: `confirmDeleteSchedule_${scheduleId}`}],
                [{text: locale.scheduleMenu.buttons.back, callback_data: `scheduleList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'scheduleMenu_number',
    type: 'regEx',
    regEx: /^scheduleMenu_[0-9]+$/,
    extract: 'scheduleMenu_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}