require('dotenv').config();
const locale = require('../../../locale').default;
const {send, deleteLastMSG} = require('../../Helpers/index');
const {Cabinet} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot, cabinetId) => {
        try {
            const cabinet = await Cabinet.findByPk(cabinetId);
            await send(ctx, bot, locale.cabinetMenu.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.cabinetMenu.text(cabinet.dataValues.id, cabinet.dataValues.floor, cabinet.dataValues.places, cabinet.dataValues.heWorks), [
                [{text: locale.cabinetMenu.buttons.changePlaces, callback_data: `changePlacesCabinet_${cabinetId}`},],
                [{text: locale.cabinetMenu.buttons.delete, callback_data: `confirmDeleteCabinet_${cabinetId}`},
                    {text: locale.cabinetMenu.buttons.changeWork(cabinet.dataValues.heWorks), callback_data: `changeWorkCabinet_${cabinetId}`}],
                [{text: locale.lessonMenu.buttons.back, callback_data: `cabinetsList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'cabinetMenu_number',
    type: 'regEx',
    regEx: /^cabinetMenu_[0-9]+$/,
    extract: 'cabinetMenu_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}