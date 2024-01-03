require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            await send(ctx, bot, locale.addTeacher.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            await User_state.update({action: 'addTeacher', param: 'id'}, {where: {id: ctx.from.id}})
            return await send(ctx, bot, locale.addTeacher.text, [
                [{text: locale.addTeacher.buttons.cancel, callback_data: `workerClearState`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addTeacher',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}