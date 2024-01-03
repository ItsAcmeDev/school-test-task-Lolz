const helpIndex = require('./HelpIndex'),
    {User_state} = require('../sequelize');

module.exports.CallBack = async function (ctx, bot) {
    try {
        if (ctx['data'] !== undefined) {
            for (const data in helpIndex) {
                if (helpIndex[data].type === 'callBack') {
                    if (helpIndex[data].callBack === ctx.data) {
                        try {
                            if (helpIndex[data]['isWork'] !== false) {
                                return await helpIndex[data].function(ctx, bot);
                            } else {
                                return await bot.answerCallbackQuery(ctx.id, {text: 'Данная функция пока не доступна'})
                            }
                        } catch (e) {
                            console.log(`Ошибка в файле: ${helpIndex[data]['file']}`)
                        }
                    }
                }
                if(helpIndex[data]['paginate'] !== undefined) {
                    if (helpIndex[data]['paginate'].type === 'regEx') {
                        if (helpIndex[data]['paginate']['regEx'].test(ctx.data) === true) {
                            try {
                                if (helpIndex[data]['isWork'] !== false) {
                                    return await helpIndex[data]['paginate'].function(ctx, bot, parseInt(ctx.data.replace(helpIndex[data]['paginate']['extract'], '')));
                                } else {
                                    return await bot.answerCallbackQuery(ctx.id, {text: 'Данная функция пока не доступна'})
                                }
                            } catch (e) {
                                console.log(`Ошибка в файле: ${helpIndex[data]['file']}`);
                            }
                        }
                    }
                }
                if(helpIndex[data]['regEx'] !== undefined) {
                    if (helpIndex[data]['regEx'].test(ctx.data) === true) {
                        try {
                            if (helpIndex[data]['isWork'] !== false) {
                                return await helpIndex[data].function(ctx, bot, parseInt(ctx.data.replace(helpIndex[data]['extract'], '')));
                            } else {
                                return await bot.answerCallbackQuery(ctx.id, {text: 'Данная функция пока не доступна'})
                            }
                        } catch (e) {
                            console.log(`Ошибка в файле: ${helpIndex[data]['file']}`);
                        }
                    }
                }
            }
        }
        if (ctx['data'] === undefined && ctx['entities'] === undefined || ctx['data'] === undefined && ctx['entities'].length === 0 || ctx['data'] === undefined && ctx['entities'][0]['type'] === 'phone_number' || ctx['data'] === undefined && ctx['entities'][0]['type'] === 'email' || ctx['data'] === undefined && ctx['entities'][0]['type'] === 'url' || ctx['data'] === undefined && ctx['entities'][0]['type'] === 'mention') {
            for (const data in helpIndex) {
                if (helpIndex[data].type === 'state') {
                    const userState = await User_state.findByPk(ctx.from.id);
                    if (!userState || userState.dataValues.action === '') {
                        return await helpIndex['stateIsMissing'].function(ctx, bot);
                    }
                    if (userState.dataValues.action === helpIndex[data]['state']) {
                        if (helpIndex[data]['param'] === undefined) {
                            try {
                                if (helpIndex[data]['isWork'] !== false) {
                                    return await helpIndex[data].function(ctx, bot);
                                }
                            } catch (e) {
                                console.log(`Ошибка в файле: ${helpIndex[data]['file']}`);
                            }
                        }
                        if (helpIndex[data]['param'] !== undefined) {
                            if (userState.dataValues.param === helpIndex[data]['param']) {
                                try {
                                    if (helpIndex[data]['isWork'] !== false) {
                                        return await helpIndex[data].function(ctx, bot);
                                    }
                                } catch (e) {
                                    console.log(`Ошибка в файле: ${helpIndex[data]['file']}`);
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}