require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state, PropertyLesson} = require('../../../../sequelize');
const moment = require("moment");

module.exports = {
    function: async (ctx, bot) => {
        try {
            if (moment(ctx.text, 'HH:mm:ss', true).isValid() === true) {
                console.log(ctx.user.data.state)
                await User_state.update({action: '', param: '', data: ''}, {where: {id: ctx.from.id}});
                await PropertyLesson.update({
                    duration: ctx.text
                }, {where: {id: ctx.user.data.state.data}});
                await send(ctx, bot, locale.editLessonDuration.handlerTwo.emoji, []);
                await send(ctx, bot, locale.editLessonDuration.handlerTwo.text, [[{text: locale.editLessonDuration.handlerTwo.buttons.back, callback_data: `lessonMenu_${ctx.user.data.state.data}`}]]);
                return await deleteLastMSG(ctx, bot, 2);
            } else {
                await send(ctx, bot, locale.editLessonDuration.handlerTwo.errorData, [[{text: locale.editLessonDuration.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx, bot, 2);
            }
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'editLessonDurationState',
    type: 'state',
    state: 'editLessonDuration',
    isWork: true,
    file: `${__dirname}/${__filename}`
}