require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state, EducationActivity, PropertyLesson} = require('../../../../sequelize');
const moment = require("moment");

module.exports = {
    function: async (ctx, bot) => {
        try {
            console.log(moment(ctx.text, 'HH:mm:ss', true).isValid())
            if (moment(ctx.text, 'HH:mm:ss', true).isValid() === true) {
                const userData = JSON.parse((await User_state.findByPk(ctx.from.id)).dataValues.data);
                await User_state.update({action: '', param: '', data: ''}, {where: {id: ctx.from.id}});
                const newLesson = await EducationActivity.create({title: userData.title});
                await PropertyLesson.create({
                    id: newLesson.dataValues.id,
                    duration: ctx.text,
                    isActive: true
                });
                await send(ctx, bot, locale.addLesson.handlerTwo.emoji, []);
                await send(ctx, bot, locale.addLesson.handlerTwo.text, [[{text: locale.addLesson.handlerTwo.buttons.back, callback_data: 'lessonsList'}]]);
                return await deleteLastMSG(ctx, bot, 1);
            } else {
                await send(ctx, bot, locale.addLesson.handlerTwo.errorData, [[{text: locale.addLesson.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx, bot, 1);
            }
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addLessonStateTwo',
    type: 'state',
    state: 'addLesson',
    param: 'duration',
    isWork: true,
    file: `${__dirname}/${__filename}`
}