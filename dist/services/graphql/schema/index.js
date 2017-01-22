"use strict";
const root_1 = require("./root");
const starship_1 = require("./starship");
const vehicle_1 = require("./vehicle");
const part_1 = require("./part");
const labor_1 = require("./labor");
const user_1 = require("./user");
const authPayload_1 = require("./authPayload");
const model_1 = require("./model");
const sub_model_1 = require("./sub-model");
const schema = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    schema,
    root_1.default,
    starship_1.default,
    vehicle_1.default,
    part_1.default,
    labor_1.default,
    user_1.default,
    authPayload_1.default,
    model_1.default,
    sub_model_1.default
];
//# sourceMappingURL=index.js.map