require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state, EducationActivity, PropertyLesson} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            if (/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(ctx.text) === false) {
                await send(ctx, bot, locale.addTeacher.handlerTwo.notNumber, [[{text: locale.addTeacher.buttons.cancel, callback_data: 'workerClearState'}]]);
                return deleteLastMSG(ctx, bot, 2);
            }
             const allLessons = await EducationActivity.findAll({
                include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    include: [],
                    as: 'property_lesson'
                }],
            });
            const buttons = [];
            ctx.user.data.state.data.specialization = []
            for (const lesson of allLessons) {
                buttons.push([{
                        text: lesson.dataValues.title,
                        callback_data: `MarkASubject_${lesson.dataValues.id}`
                    }])
            }
            buttons.push([{
                text: locale.addTeacher.handlerTwo.buttons.next,
                callback_data: 'nextStepAddingTeacher'
            }],[{
                text: locale.addTeacher.buttons.cancel,
                callback_data: 'workerClearState'
            }])
            ctx.user.data.state.data.experience = parseInt(ctx.text)
            await User_state.update({
                action: 'addTeacher',
                param: 'specialization',
                data: JSON.stringify(ctx.user.data.state.data)
            }, {where: {id: ctx.from.id}});
            await send(ctx, bot, locale.addTeacher.handlerTwo.text(ctx.user.data.state.data.id, ctx.user.data.state.data.experience), [...buttons]);
            return await deleteLastMSG(ctx, bot, 2);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addTeacherStateHandlerTwo',
    type: 'state',
    state: 'addTeacher',
    param: 'experience',
    isWork: true,
    file: `${__dirname}/${__filename}`
}