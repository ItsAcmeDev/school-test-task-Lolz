require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, setStatus} = require('../../../Helpers/index');
const {Teacher, User} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, teacherId) => {
        try {
            await setStatus(ctx, bot, 'typing');
            await Teacher.update({heFired: true}, {where: {id: teacherId}});
            await send(ctx, bot, locale.deleteTeacher.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            const teacherName = (await Teacher.findByPk(teacherId, {
                attributes: [],
                include: [{
                    model: User,
                    attributes: ['firstName'],
                    as: 'id_user'
                }]
            })).dataValues['id_user'].firstName;
            return await send(ctx, bot, locale.deleteTeacher.teacherDeleted(teacherName), [
                    [{text: locale.deleteTeacher.buttons.back, callback_data: `teachersList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'yesIWouldBeDeleteTeacher_number',
    type: 'regEx',
    regEx: /^yesIWouldBeDeleteTeacher_[0-9]+$/,
    extract: 'yesIWouldBeDeleteTeacher_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}