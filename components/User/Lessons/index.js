require('dotenv').config();
const locale = require('../../../locale').default;
const {pagination, edit, deleteLastMSG, send} = require('../../Helpers');
const {EducationActivity, PropertyLesson} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            const allLessons = await EducationActivity.paginate({
                pageIndex: 1,
                pageSize: 15,
                include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    as: 'property_lesson'
                }],
            });
            const buttons = [];
            if (allLessons.data.length === 0) {
                buttons.push([{text: locale.allLessons.buttons.noData, callback_data: `none`}])
            } else {
                for (const lesson of allLessons.data) {
                    buttons.push([{
                        text: lesson.dataValues.title,
                        callback_data: `lessonMenu_${lesson.dataValues.id}`
                    }])
                }
                buttons.push(pagination(allLessons.meta, 'lessonsListPage_'))
            }
            buttons.push([{text: locale.allLessons.buttons.add, callback_data: `addLesson`}],[{text: locale.allLessons.buttons.back, callback_data: `mainMenu`}])
            await send(ctx, bot, locale.allLessons.emoji, []);
            await send(ctx, bot, locale.allLessons.text(await EducationActivity.count({include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    as: 'property_lesson'
                }],})), [...buttons]);
            return await deleteLastMSG(ctx, bot, 1);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'lessonsList',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}

module.exports.paginate = {
    function: async (ctx, bot, page = 1) => {
        try {
            const allLessons = await EducationActivity.paginate({
                pageIndex: page,
                pageSize: 15,
                include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    as: 'property_lesson'
                }],
            });
            const buttons = [];
            if (allLessons.data.length === 0) {
                buttons.push([{text: locale.allLessons.buttons.noData, callback_data: `none`}])
            } else {
                for (const lesson of allLessons.data) {
                    buttons.push([{
                        text: lesson.dataValues.title,
                        callback_data: `lessonMenu_${lesson.dataValues.id}`
                    }])
                }
                buttons.push(pagination(allLessons.meta, 'lessonsListPage_'))
            }
            buttons.push([{text: locale.allLessons.buttons.add, callback_data: `addLesson`}],[{text: locale.allLessons.buttons.back, callback_data: `mainMenu`}])
            return await edit(ctx, bot, locale.allLessons.text(await EducationActivity.count({include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    as: 'property_lesson'
                }],})), [...buttons]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'lessonsListPage_number',
    type: 'regEx',
    regEx: /^lessonsListPage_[0-9]+$/,
    extract: 'lessonsListPage_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}
