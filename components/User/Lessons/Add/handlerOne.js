require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state, EducationActivity, PropertyLesson} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            const tryFindLesson = await EducationActivity.findOne({where: {title: ctx.text},
                include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    as: 'property_lesson'
                }]
            });
            if (!tryFindLesson) {
                await User_state.update({action: 'addLesson', param: 'duration', data: JSON.stringify({title: ctx.text})}, {where: {id: ctx.from.id}});
                await send(ctx, bot, locale.addLesson.handlerOne.text(ctx.text), [[{text: locale.addLesson.buttons.cancel, callback_data: 'workerClearState'}]]);
                return await deleteLastMSG(ctx,bot, 2);
            } else {
                await send(ctx, bot, locale.addLesson.handlerOne.alreadyExist, [
                    [{text: locale.addLesson.buttons.cancel, callback_data: `workerClearState`}]
                ]);
                return await deleteLastMSG(ctx,bot, 2);
            }
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addLessonStateOne',
    type: 'state',
    state: 'addLesson',
    param: 'title',
    isWork: true,
    file: `${__dirname}/${__filename}`
}