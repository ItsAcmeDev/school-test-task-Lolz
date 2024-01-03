require('dotenv').config();
const BOT = require('node-telegram-bot-api');
const bot = new BOT(process.env.TOKEN, {polling: {autoStart: true, interval: 300}});

const MW = require('./components/Middleware/index')
const countPackage = require('./components/HelpIndex').packageCount

const {CallBack} = require('./components');
const mainMenu = require('./components/User/mainMenu');

bot.onText(/\/start/, async function (ctx) {
    ctx = await MW(ctx);
    let parameter = ctx.text.replace('/start', '').replace(' ', '');
    if (!parameter) {
        return await mainMenu.start(ctx, bot);
    }
});

bot.on('message', async function (ctx) {
    if (ctx['entities'] === undefined || ctx['entities'].length === 0 ||ctx['entities'][0].type !== 'bot_command') {
        ctx = await MW(ctx);
        return await CallBack(ctx, bot)
    }
})


bot.on('callback_query', async function (ctx) {
    ctx = await MW(ctx);
    return await CallBack(ctx, bot);
});


bot.getMe().then((me) => {
    console.log('✅ Бот запущен успешно!\n' +
        `| 📰 Юзер пакетов загружено: ${countPackage.user}\n` +
        '\n🤖 О боте:\n' +
        `| 🪪 Id: ${me.id}\n` +
        `| 👀 Username: ${me.username}`)
});