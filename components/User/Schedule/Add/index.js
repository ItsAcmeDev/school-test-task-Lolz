require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state, PropertyLesson, EducationActivity} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            await send(ctx, bot, locale.addSchedule.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            await User_state.update({action: 'addSchedule', param: 'selectLesson'}, {where: {id: ctx.from.id}});
            const allLessons = await EducationActivity.findAll({
                include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    as: 'property_lesson'
                }],
            });
            const buttons = [];
            if (allLessons.length === 0) {
                buttons.push([{text: locale.allLessons.buttons.noData, callback_data: `none`}])
            } else {
                for (const lesson of allLessons) {
                    buttons.push([{
                        text: lesson.dataValues.title,
                        callback_data: `selectScheduleLesson_${lesson.dataValues.id}`
                    }])
                }
            }
            buttons.push([{text: locale.addSchedule.buttons.cancel, callback_data: `workerClearState`}])
            return await send(ctx, bot, locale.addSchedule.text, [...buttons]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addSchedule',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}