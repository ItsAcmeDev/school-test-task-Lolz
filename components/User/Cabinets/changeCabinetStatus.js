require('dotenv').config();
const locale = require('../../../locale').default;
const {edit} = require('../../Helpers/index');
const {Cabinet} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot, cabinetId) => {
        try {
            const cabinetStatus = (await Cabinet.findByPk(cabinetId, {attributes: ['heWorks']})).dataValues.heWorks;
            await Cabinet.update({heWorks: cabinetStatus === false}, {where: {id: cabinetId}});
            const cabinet = await Cabinet.findByPk(cabinetId)
            return await edit(ctx, bot, locale.cabinetMenu.text(cabinet.dataValues.id, cabinet.dataValues.floor, cabinet.dataValues.places, cabinet.dataValues.heWorks), [
                [{text: locale.cabinetMenu.buttons.changePlaces, callback_data: `changePlacesCabinet_${cabinetId}`},],
                [{text: locale.cabinetMenu.buttons.delete, callback_data: `confirmDeleteCabinet_${cabinetId}`},
                    {text: locale.cabinetMenu.buttons.changeWork(cabinet.dataValues.heWorks), callback_data: `changeWorkCabinet_${cabinetId}`}],
                [{text: locale.lessonMenu.buttons.back, callback_data: `cabinetsList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'changeWorkCabinet_number',
    type: 'regEx',
    regEx: /^changeWorkCabinet_[0-9]+$/,
    extract: 'changeWorkCabinet_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}