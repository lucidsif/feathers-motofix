"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type Appointment implements Node {
  id: ID!
  motorcycle_address: String!
  contact_number: String!
  estimated_start_time: String!
  estimated_end_time: String!
  status: String!
  fk_quote_id: Int!
  fk_mechanic_id: Int!
  fk_user_id: Int!
  
  }
`;
//# sourceMappingURL=appointment.js.map