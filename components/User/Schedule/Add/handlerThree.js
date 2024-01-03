require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, answerCallbackQuery} = require('../../../Helpers/index');
const {User_state, TimeSchedule} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, cabinetId) => {
        try {
            if (ctx.user.data.state.action === 'addSchedule' && ctx.user.data.state.param === 'selectCabinet') {
                await send(ctx, bot, locale.addSchedule.handlerThree.emoji, []);
                await deleteLastMSG(ctx, bot, 1);
                ctx.user.data.state.data.cabinet = cabinetId;
                await User_state.update({action: '', param: '', data: ''}, {where: {id: ctx.from.id}});
                await TimeSchedule.create({
                    cabinet: cabinetId,
                    teacher: ctx.user.data.state.data.teacher,
                    lesson: ctx.user.data.state.data.lesson,
                    date: new Date().toISOString().split('T')[0],
                    isActive: true
                })
                return await send(ctx, bot, locale.addSchedule.handlerThree.text, [[{text: locale.addSchedule.handlerThree.buttons.back, callback_data: 'scheduleList'}]]);
            }
            return answerCallbackQuery(ctx, bot, '👀 Начните добавление предмета в расписание заного!')
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'selectScheduleCabinet_number',
    type: 'regEx',
    regEx: /^selectScheduleCabinet_[0-9]+$/,
    extract: 'selectScheduleCabinet_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}