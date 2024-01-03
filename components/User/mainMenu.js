require('dotenv').config();
const locale = require('../../locale').default;
const {send, deleteLastMSG} = require('../Helpers');

const buttons = [
    [{text: locale.mainMenu.buttons.teachers, callback_data: `teachersList`},
        {text: locale.mainMenu.buttons.lessons, callback_data: `lessonsList`}],
    [{text: locale.mainMenu.buttons.cabinets, callback_data: `cabinetsList`}],
        [{text: locale.mainMenu.buttons.schedule, callback_data: `scheduleList`}],
    ];

module.exports = {
    function: async (ctx, bot) => {
        try {
            await send(ctx, bot, locale.mainMenu.emoji, []);
            await send(ctx, bot, locale.mainMenu.text(ctx.from.first_name), [...buttons]);
            return await deleteLastMSG(ctx, bot, 1);
        } catch (e) {
            return await send(ctx, bot, locale.errorMessage.text, []);
        }
    },
    callBack: 'mainMenu',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}



module.exports.start = async (ctx, bot) => {
    try {
        await send(ctx, bot, locale.mainMenu.emoji, []);
        return await send(ctx, bot, locale.mainMenu.text(ctx.from.first_name), [...buttons]);
    } catch (e) {
        return await send(ctx, bot, locale.errorMessage.text, []);
    }
}




