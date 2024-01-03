require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, answerCallbackQuery} = require('../../../Helpers/index');
const {User_state, Teacher, User, TimeSchedule, EducationActivity} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, lessonId) => {
        try {
            if (ctx.user.data.state.action === 'addSchedule' && ctx.user.data.state.param === 'selectLesson') {
                await send(ctx, bot, locale.addSchedule.emoji, []);
                await deleteLastMSG(ctx, bot, 1);
                await User_state.update({action: 'addSchedule', param: 'selectTeacher', data: JSON.stringify({lesson: lessonId})}, {where: {id: ctx.from.id}});
                const allTeachers = await Teacher.findAll({
                    where: {
                        heWorks: true,
                        heFired: false
                    },
                    attributes: ['id'],
                    include: [{
                        model: User,
                        attributes: ['firstName'],
                        as: 'id_user'
                    }]
                });
                const buttons = [];
                if (allTeachers.length === 0) {
                    buttons.push([{text: locale.addSchedule.buttons.noData, callback_data: `none`}])
                } else {
                    for (const teacher of allTeachers) {
                        if (await TimeSchedule.count({where: {teacher: teacher.dataValues.id, isActive: true, date: new Date().toISOString().split('T')[0]}}) < 5) {
                            buttons.push([{
                                text: teacher.dataValues['id_user'].dataValues.firstName,
                                callback_data: `selectScheduleTeacher_${teacher.dataValues.id}`
                            }])
                        }
                    }
                }
                buttons.push([{text: locale.addSchedule.buttons.cancel, callback_data: `workerClearState`}])
                return await send(ctx, bot, locale.addSchedule.handlerOne.text((await EducationActivity.findByPk(lessonId, {attributes: ['title']})).dataValues.title), [...buttons]);
            }
            return answerCallbackQuery(ctx, bot, '👀 Начните добавление предмета в расписание заного!')
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'selectScheduleLesson_number',
    type: 'regEx',
    regEx: /^selectScheduleLesson_[0-9]+$/,
    extract: 'selectScheduleLesson_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}