require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, answerCallbackQuery} = require('../../../Helpers/index');
const {User_state, Teacher, User, EducationActivity, Cabinet} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, teacherId) => {
        try {
            if (ctx.user.data.state.action === 'addSchedule' && ctx.user.data.state.param === 'selectTeacher') {
                await send(ctx, bot, locale.addSchedule.emoji, []);
                await deleteLastMSG(ctx, bot, 1);
                ctx.user.data.state.data.teacher = teacherId;
                await User_state.update({action: 'addSchedule', param: 'selectCabinet', data: JSON.stringify(ctx.user.data.state.data)}, {where: {id: ctx.from.id}});
                const allCabinets = await Cabinet.paginate({
                    pageIndex: 1,
                    pageSize: 15,
                    where: {
                        isDeleted: false
                    },
                    attributes: ['id', 'places', 'floor']
                });
                const buttons = [];
                if (allCabinets.data.length === 0) {
                    buttons.push([{text: locale.allCabinets.buttons.noData, callback_data: `none`}])
                } else {
                    for (const cabinet of allCabinets.data) {
                        buttons.push([{
                            text: locale.allCabinets.buttons.cabinet(cabinet.dataValues.id, cabinet.dataValues.places, cabinet.dataValues.floor),
                            callback_data: `selectScheduleCabinet_${cabinet.dataValues.id}`
                        }])
                    }
                }
                buttons.push([{text: locale.addSchedule.buttons.cancel, callback_data: `workerClearState`}])
                return await send(ctx, bot, locale.addSchedule.handlerTwo.text((await EducationActivity.findByPk(ctx.user.data.state.data.lesson, {attributes: ['title']})).dataValues.title, (await Teacher.findByPk(teacherId, {attributes: ['id'], include: [{model: User, attributes: ['firstName'], as: 'id_user'}]})).dataValues['id_user'].dataValues.firstName), [...buttons]);
            }
            return answerCallbackQuery(ctx, bot, '👀 Начните добавление предмета в расписание заного!')
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'selectScheduleTeacher_number',
    type: 'regEx',
    regEx: /^selectScheduleTeacher_[0-9]+$/,
    extract: 'selectScheduleTeacher_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}