"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("./root");
const starship_1 = require("./starship");
const vehicle_1 = require("./vehicle");
const part_1 = require("./part");
const labor_1 = require("./labor");
const user_1 = require("./user");
const authPayload_1 = require("./authPayload");
const quote_1 = require("./quote");
const custom_quote_1 = require("./custom-quote");
const model_1 = require("./model");
const sub_model_1 = require("./sub-model");
const lubricants_and_capacities_1 = require("./lubricants_and_capacities");
const distance_matrix_1 = require("./distance-matrix");
const appointment_1 = require("./appointment");
const mechanic_schedule_1 = require("./mechanic-schedule");
const appointment_schedule_1 = require("./appointment-schedule");
const stripe_response_1 = require("./stripe-response");
const voucher_1 = require("./voucher");
const schema = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  
  interface Node {
  id: ID!
}

  scalar JSON
`;
exports.default = [
    schema,
    root_1.default,
    starship_1.default,
    vehicle_1.default,
    part_1.default,
    labor_1.default,
    user_1.default,
    authPayload_1.default,
    quote_1.default,
    custom_quote_1.default,
    model_1.default,
    sub_model_1.default,
    lubricants_and_capacities_1.default,
    distance_matrix_1.default,
    appointment_1.default,
    mechanic_schedule_1.default,
    appointment_schedule_1.default,
    stripe_response_1.default,
    voucher_1.default
];
//# sourceMappingURL=index.js.map