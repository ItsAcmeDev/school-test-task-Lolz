require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, answerCallbackQuery} = require('../../../Helpers/index');
const {User_state, Teacher} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            if (ctx.user.data.state.action === 'addTeacher' && ctx.user.data.state.param === 'specialization') {
                if (ctx.user.data.state.data['specialization'] === undefined || ctx.user.data.state.data['specialization'].length === 0) {
                    return await answerCallbackQuery(ctx, bot, '👀 Выберите хотя бы один предмет!');
                }
                if (ctx.user.data.state.data['firedTeacher'] !== undefined && ctx.user.data.state.data['firedTeacher'] === true) {
                    await Teacher.destroy({where: {id: ctx.user.data.state.data.id}});
                }
                await User_state.update({action: '', param: '', data: ''}, {where: {id: ctx.from.id}});
                await Teacher.create({
                    id: ctx.user.data.state.data.id,
                    experience: ctx.user.data.state.data.experience,
                    schoolSubjects: ctx.user.data.state.data.specialization,
                    heWorks: true,
                    heFired: false
                })
                await send(ctx, bot, locale.addTeacher.handlerThree.text, [[{text: locale.addTeacher.handlerThree.buttons.back, callback_data: 'teachersList'}]]);
                return await deleteLastMSG(ctx, bot, 2);
            }
            return await answerCallbackQuery(ctx, bot, '❌ Пожалуйста, добавьте учителя заного!', true);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'nextStepAddingTeacher',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}