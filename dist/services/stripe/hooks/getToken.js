'use strict';
const defaults = {};
module.exports = function (options) {
    return function (hook) {
        hook.getToken = true;
        console.log('inside hook');
        console.log(hook.params);
    };
};
//# sourceMappingURL=getToken.js.map