"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id = (quote) => quote.id;
const fk_user_id = (quote) => quote.fk_user_id;
const motorcycle_json = (quote) => quote.motorcycle_json;
const cart_json = (quote) => quote.cart_json;
const part_json = (quote) => quote.part_json;
const use_own_parts = (quote) => quote.use_own_parts;
const voucher_code_status = (quote) => quote.voucher_code_status;
const created_at = (quote) => quote.created_at;
const updated_at = (quote) => quote.updated_at;
exports.default = {
    Quote: {
        id,
        fk_user_id,
        motorcycle_json,
        cart_json,
        part_json,
        use_own_parts,
        voucher_code_status,
        created_at,
        updated_at
    }
};
//# sourceMappingURL=quote.js.map