require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            await send(ctx, bot, locale.addLesson.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            await User_state.update({action: 'addLesson', param: 'title'}, {where: {id: ctx.from.id}})
            return await send(ctx, bot, locale.addLesson.text, [
                [{text: locale.addLesson.buttons.cancel, callback_data: `workerClearState`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addLesson',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}