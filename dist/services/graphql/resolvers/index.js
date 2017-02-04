"use strict";
const GraphQLJSON = require('graphql-type-json');
const root_1 = require("./root");
const starship_1 = require("./starship");
const vehicle_1 = require("./vehicle");
const part_1 = require("./part");
const labor_1 = require("./labor");
const authPayload_1 = require("./authPayload");
const quote_1 = require("./quote");
const model_1 = require("./model");
const sub_model_1 = require("./sub-model");
const lubricants_and_capacities_1 = require("./lubricants_and_capacities");
const distance_matrix_1 = require("./distance-matrix");
const obj = { JSON: GraphQLJSON };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Object.assign(obj, root_1.default, starship_1.default, vehicle_1.default, part_1.default, labor_1.default, authPayload_1.default, quote_1.default, model_1.default, sub_model_1.default, lubricants_and_capacities_1.default, distance_matrix_1.default);
//# sourceMappingURL=index.js.map