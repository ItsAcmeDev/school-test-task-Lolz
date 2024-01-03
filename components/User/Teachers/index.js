require('dotenv').config();
const locale = require('../../../locale').default;
const {pagination, edit, deleteLastMSG, send} = require('../../Helpers');
const {Teacher, User} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            const allTeachers = await Teacher.paginate({
                pageIndex: 1,
                pageSize: 15,
                where: {
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
            if (allTeachers.data.length === 0) {
                buttons.push([{text: locale.allTeachers.buttons.noData, callback_data: `none`}])
            } else {
                for (const teacher of allTeachers.data) {
                    buttons.push([{
                        text: teacher.dataValues['id_user'].dataValues.firstName,
                        callback_data: `teacherMenu_${teacher.dataValues.id}`
                    }])
                }
                buttons.push(pagination(allTeachers.meta, 'teachersListPage_'))
            }
            buttons.push([{text: locale.allTeachers.buttons.add, callback_data: `addTeacher`}],[{text: locale.allTeachers.buttons.back, callback_data: `mainMenu`}])
            await send(ctx, bot, locale.allTeachers.emoji, []);
            await send(ctx, bot, locale.allTeachers.text(await Teacher.count({where: {heFired: false}})), [...buttons]);
            return await deleteLastMSG(ctx, bot, 1);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'teachersList',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}

module.exports.paginate = {
    function: async (ctx, bot, page = 1) => {
        try {
            const allTeachers = await Teacher.paginate({
                pageIndex: page,
                pageSize: 15,
                where: {
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
            if (allTeachers.data.length === 0) {
                buttons.push([{text: locale.allTeachers.buttons.noData, callback_data: `none`}])
            } else {
                for (const teacher of allTeachers.data) {
                    buttons.push([{
                        text: teacher.dataValues['id_user'].dataValues.firstName,
                        callback_data: `teacherMenu_${teacher.dataValues.id}`
                    }])
                }
                buttons.push(pagination(allTeachers.meta, 'teachersListPage_'))
            }
            buttons.push([{text: locale.allTeachers.buttons.add, callback_data: `addTeacher`}],[{text: locale.allTeachers.buttons.back, callback_data: `mainMenu`}])
            return await edit(ctx, bot, locale.allTeachers.text(await Teacher.count({where: {heFired: false}})), [...buttons]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'cabinetsListPage_number',
    type: 'regEx',
    regEx: /^cabinetsListPage_[0-9]+$/,
    extract: 'cabinetsListPage_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}
