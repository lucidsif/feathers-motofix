'use strict';
const defaults = {};
module.exports = function (options) {
    return function (hook) {
        hook.onlyAuthenticatedUserAppointments = true;
        const user = hook.params.user;
        const userID = user.dataValues.id;
        return hook.app.service('quotes').find({
            query: { fk_user_id: userID }
        }).then((page) => {
            const authUserQuotes = page[0].dataValues;
            console.log(authUserQuotes);
            console.log(hook);
            hook.data.authUserQuotes = authUserQuotes;
            console.log(hook.data.authUserQuotes);
            return hook;
        });
    };
};
//# sourceMappingURL=onlyAuthenticatedUserAppointments.js.map