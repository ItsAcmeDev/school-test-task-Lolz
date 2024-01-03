const {readdirSync} = require("fs");

module.exports = async (ctx) => {
    for (const file of readdirSync(__dirname + '/components')) {
        ctx = await (require(__dirname + `/components/${file}`))(ctx);
    }
    return ctx
}