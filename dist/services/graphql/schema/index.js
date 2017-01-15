"use strict";
const root_1 = require("./root");
const starship_1 = require("./starship");
const motorcycle_1 = require("./motorcycle");
const part_1 = require("./part");
const labor_1 = require("./labor");
const schema = `
  schema {
    query: RootQuery
  }
`;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    schema,
    root_1.default,
    starship_1.default,
    motorcycle_1.default,
    part_1.default,
    labor_1.default
];
//# sourceMappingURL=index.js.map