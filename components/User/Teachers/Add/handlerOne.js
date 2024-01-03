require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG} = require('../../../Helpers/index');
const {User_state, User, Teacher} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            if (/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(ctx.text) === false) {
                await send(ctx, bot, locale.addTeacher.handlerOne.notNumber, [[{text: locale.addTeacher.buttons.cancel, callback_data: 'workerClearState'}]]);
                return deleteLastMSG(ctx, bot, 2);
            }
            const tryFindPeople = await User.findByPk(parseInt(ctx.text), {
                attributes: ['id'],
                include: [{
                model: Teacher,
                    attributes: ['heFired'],
                    as: 'teacher'
                }]});
            if (tryFindPeople) {
                if (!tryFindPeople.dataValues.teacher || tryFindPeople.dataValues.teacher.dataValues.heFired === true) {
                    await Teacher.destroy({where: {id: parseInt(ctx.text)}})
                    await User_state.update({
                        action: 'addTeacher',
                        param: 'experience',
                        data: JSON.stringify({id: parseInt(ctx.text)})
                    }, {where: {id: ctx.from.id}});
                    await send(ctx, bot, locale.addTeacher.handlerOne.text(ctx.text), [[{
                        text: locale.addTeacher.buttons.cancel,
                        callback_data: 'workerClearState'
                    }]]);
                    return await deleteLastMSG(ctx, bot, 2);
                } else {
                    await send(ctx, bot, locale.addTeacher.handlerOne.errorEmoji, []);
                    await send(ctx, bot, locale.addTeacher.handlerOne.teacherAlreadyExist, [
                        [{text: locale.addTeacher.buttons.cancel, callback_data: `workerClearState`}]
                    ]);
                    return await deleteLastMSG(ctx,bot, 2);
                }
            } else {
                await send(ctx, bot, locale.addTeacher.handlerOne.errorEmoji, []);
                await send(ctx, bot, locale.addTeacher.handlerOne.notFound, [
                    [{text: locale.addTeacher.buttons.cancel, callback_data: `workerClearState`}]
                ]);
                return await deleteLastMSG(ctx,bot, 2);
            }
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'addTeacherStateHandlerOne',
    type: 'state',
    state: 'addTeacher',
    param: 'id',
    isWork: true,
    file: `${__dirname}/${__filename}`
}