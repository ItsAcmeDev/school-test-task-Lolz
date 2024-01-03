require('dotenv').config();
const locale = require('../../../../locale').default;
const {send, deleteLastMSG, setStatus} = require('../../../Helpers/index');
const {PropertyLesson, EducationActivity} = require('../../../../sequelize');

module.exports = {
    function: async (ctx, bot, lessonId) => {
        try {
            await setStatus(ctx, bot, 'typing');
            await PropertyLesson.update({isActive: false}, {where: {id: lessonId}});
            await send(ctx, bot, locale.deleteLesson.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.deleteLesson.lessonDeleted((await EducationActivity.findByPk(lessonId)).dataValues.title), [
                    [{text: locale.deleteLesson.buttons.back, callback_data: `lessonsList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'yesIWouldBeDeleteLesson_number',
    type: 'regEx',
    regEx: /^yesIWouldBeDeleteLesson_[0-9]+$/,
    extract: 'yesIWouldBeDeleteLesson_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}