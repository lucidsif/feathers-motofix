'use strict';
module.exports = function (options) {
    return function (hook) {
        hook.process = true;
        const user = hook.params.user;
        const motorcycle_json = hook.data.motorcycle_json;
        const part_json = hook.data.part_json;
        const cart_json = hook.data.cart_json;
        const use_own_parts = hook.data.use_own_parts;
        const voucher_code_status = hook.data.voucher_code_status;
        hook.data = {
            fk_user_id: user.dataValues.id,
            motorcycle_json,
            part_json,
            cart_json,
            use_own_parts,
            voucher_code_status
        };
    };
};
//# sourceMappingURL=process.js.map