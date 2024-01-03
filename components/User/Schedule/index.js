require('dotenv').config();
const locale = require('../../../locale').default;
const {pagination, edit, deleteLastMSG, send} = require('../../Helpers');
const {Teacher, User, TimeSchedule, EducationActivity, PropertyLesson, Cabinet} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            const allSchedule = await TimeSchedule.paginate({
                pageIndex: 1,
                pageSize: 15,
                where: {
                    date: new Date().toISOString().split('T')[0],
                    isActive: true
                },
                include: [{
                    model: Teacher,
                    attributes: ['id'],
                    include: {
                      model: User,
                      attributes: ['firstName'],
                      as: 'id_user'
                    },
                    where: {
                        heWorks: true,
                        heFired: false
                    },
                    as: 'teacher_teacher'
                }, {
                    model: Cabinet,
                    where: {
                        heWorks: true,
                        isDeleted: false
                    },
                    attributes: ['id'],
                    as: 'cabinet_cabinet'
                }, {
                    model: EducationActivity,
                    attributes: ['title'],
                    include: [{
                        model: PropertyLesson,
                        where: {isActive: true},
                        as: 'property_lesson'
                    }],
                    as: 'lesson_education_activity'
                }]
            });
            const buttons = [];
            if (allSchedule.data.length === 0) {
                buttons.push([{text: locale.allSchedule.buttons.noData, callback_data: `none`}])
            } else {
                for (const schedule of allSchedule.data) {
                    if (schedule.dataValues['lesson_education_activity'] !== null) {
                        if (schedule.dataValues['lesson_education_activity'].dataValues['property_lesson'].dataValues.isActive === true) {
                            buttons.push([{
                                text: locale.allSchedule.buttons.cell(
                                    schedule.dataValues.cabinet,
                                    schedule.dataValues['lesson_education_activity'].dataValues.title,
                                    schedule.dataValues['teacher_teacher'].dataValues['id_user'].dataValues.firstName
                                ),
                                callback_data: `scheduleMenu_${schedule.dataValues.id}`
                            }])
                        }
                    }
                }
                buttons.push(pagination(allSchedule.meta, 'scheduleListPage_'))
            }
            buttons.push([{text: locale.allSchedule.buttons.add, callback_data: `addSchedule`}],[{text: locale.allSchedule.buttons.back, callback_data: `mainMenu`}])
            await send(ctx, bot, locale.allSchedule.emoji, []);
            await send(ctx, bot, locale.allSchedule.text, [...buttons]);
            return await deleteLastMSG(ctx, bot, 1);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'scheduleList',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}

module.exports.paginate = {
    function: async (ctx, bot, page) => {
        try {
            const allSchedule = await TimeSchedule.paginate({
                pageIndex: page,
                pageSize: 15,
                where: {
                    date: new Date().toISOString().split('T')[0],
                    isActive: true
                },
                include: [{
                    model: Teacher,
                    attributes: ['id'],
                    include: {
                        model: User,
                        attributes: ['firstName'],
                        as: 'id_user'
                    },
                    where: {
                        heWorks: true,
                        heFired: false
                    },
                    as: 'teacher_teacher'
                }, {
                    model: Cabinet,
                    where: {
                        heWorks: true,
                        isDeleted: false
                    },
                    attributes: ['id'],
                    as: 'cabinet_cabinet'
                }, {
                    model: EducationActivity,
                    attributes: ['title'],
                    include: [{
                        model: PropertyLesson,
                        where: {isActive: true},
                        as: 'property_lesson'
                    }],
                    as: 'lesson_education_activity'
                }]
            });
            const buttons = [];
            if (allSchedule.data.length === 0) {
                buttons.push([{text: locale.allSchedule.buttons.noData, callback_data: `none`}])
            } else {
                for (const schedule of allSchedule.data) {
                    if (schedule.dataValues['lesson_education_activity'] !== null) {
                        if (schedule.dataValues['lesson_education_activity'].dataValues['property_lesson'].dataValues.isActive === true) {
                            buttons.push([{
                                text: locale.allSchedule.buttons.cell(
                                    schedule.dataValues.cabinet,
                                    schedule.dataValues['lesson_education_activity'].dataValues.title,
                                    schedule.dataValues['teacher_teacher'].dataValues['id_user'].dataValues.firstName,
                                ),
                                callback_data: `scheduleMenu_${schedule.dataValues.id}`
                            }])
                        }
                    }
                }
                buttons.push(pagination(allSchedule.meta, 'scheduleListPage_'))
            }
            buttons.push([{text: locale.allSchedule.buttons.add, callback_data: `addSchedule`}],[{text: locale.allSchedule.buttons.back, callback_data: `mainMenu`}])
            return await edit(ctx, bot, locale.allSchedule.text, [...buttons]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'scheduleListPage_number',
    type: 'regEx',
    regEx: /^scheduleListPage_[0-9]+$/,
    extract: 'scheduleListPage_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}