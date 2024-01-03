require('dotenv').config();
const locale = require('../../../locale').default;
const {pagination, edit, deleteLastMSG, send} = require('../../Helpers');
const {Cabinet} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot) => {
        try {
            const allCabinets = await Cabinet.paginate({
                pageIndex: 1,
                pageSize: 15,
                where: {
                    isDeleted: false
                },
                attributes: ['id', 'places', 'floor']
            });
            const buttons = [];
            if (allCabinets.data.length === 0) {
                buttons.push([{text: locale.allCabinets.buttons.noData, callback_data: `none`}])
            } else {
                for (const cabinet of allCabinets.data) {
                    buttons.push([{
                        text: locale.allCabinets.buttons.cabinet(cabinet.dataValues.id, cabinet.dataValues.places, cabinet.dataValues.floor),
                        callback_data: `cabinetMenu_${cabinet.dataValues.id}`
                    }])
                }
                buttons.push(pagination(allCabinets.meta, 'cabinetsListPage_'))
            }
            buttons.push([{text: locale.allCabinets.buttons.add, callback_data: `addCabinet`}],[{text: locale.allCabinets.buttons.back, callback_data: `mainMenu`}])
            await send(ctx, bot, locale.allCabinets.emoji, []);
            await send(ctx, bot, locale.allCabinets.text(await Cabinet.count({where: {heWorks: true}})), [...buttons]);
            return await deleteLastMSG(ctx, bot, 1);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'cabinetsList',
    type: 'callBack',
    isWork: true,
    file: `${__dirname}/${__filename}`
}

module.exports.paginate = {
    function: async (ctx, bot, page = 1) => {
        try {
            const allCabinets = await Cabinet.paginate({
                pageIndex: page,
                pageSize: 15,
                where: {
                    isDeleted: false
                },
                attributes: ['id', 'places', 'floor']
            });
            const buttons = [];
            if (allCabinets.data.length === 0) {
                buttons.push([{text: locale.allCabinets.buttons.noData, callback_data: `none`}])
            } else {
                for (const cabinet of allCabinets.data) {
                    buttons.push([{
                        text: locale.allCabinets.buttons.cabinet(cabinet.dataValues.id, cabinet.dataValues.places, cabinet.dataValues.floor),
                        callback_data: `cabinetMenu_${cabinet.dataValues.id}`
                    }])
                }
                buttons.push(pagination(allCabinets.meta, 'cabinetsListPage_'))
            }
            buttons.push([{text: locale.allCabinets.buttons.add, callback_data: `addCabinet`}],[{text: locale.allCabinets.buttons.back, callback_data: `mainMenu`}])
            await edit(ctx, bot, locale.allCabinets.text(await Cabinet.count({where: {heWorks: true}})), [...buttons]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'cabinetsListPage_number',
    type: 'regEx',
    regEx: /^cabinetsListPage_[0-9]+$/,
    extract: 'cabinetsListPage_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}
