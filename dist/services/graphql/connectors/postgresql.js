"use strict";
const knex = require("knex");
const config = require("../knexfile.js");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = knex(config.production);
//# sourceMappingURL=postgresql.js.map