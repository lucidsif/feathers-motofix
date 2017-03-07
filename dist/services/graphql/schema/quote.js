"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type Quote implements Node {
    id: ID!
    fk_user_id: Int!
    motorcycle_json: JSON!
    cart_json: JSON!
    part_json: JSON!
    use_own_parts: Boolean!
    voucher_code_status: Boolean!
    created_at: String!
    updated_at: String!
  }
`;
//# sourceMappingURL=quote.js.map