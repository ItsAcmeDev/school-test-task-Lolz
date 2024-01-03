const {User, User_state} = require('../../../sequelize');

module.exports = async (ctx) => {
    try {
        const tryFindUser = await User.findByPk(ctx.from.id);
        if (!tryFindUser) {
            const newUser = await User.create({
                id: ctx.from.id,
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name,
                username: ctx.from.username,
            });
            const newUser_state = await User_state.create({id: ctx.from.id})
            ctx.user = {
                newUser: true,
                data: {
                    user: newUser.dataValues,
                    state: newUser_state.dataValues,
                },
            };
        } else {
            let state = await User_state.findByPk(ctx.from.id);
            if (!state) {
                state = await User_state.create({id: ctx.from.id})
            }
            if (ctx.from.first_name !== tryFindUser.dataValues.firstName || ctx.from.last_name !== tryFindUser.dataValues.lastName ||ctx.from.username !== tryFindUser.dataValues.username) {
                await User.update({firstName: ctx.from.first_name, lastName: ctx.from.last_name, username: ctx.from.username}, {where: {id: ctx.from.id}})
            }
            ctx.user = {
                newUser: false,
                data: {
                    user: tryFindUser.dataValues,
                    state: state.dataValues
                },
            };
            ctx.user.data.state.data = JSON.parse(ctx.user.data.state.data)
        }
        return ctx
    } catch (e) {
        return ctx
    }
}
