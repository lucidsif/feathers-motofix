"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const config = require("../knexfile.js");
exports.default = knex(config.production);
//# sourceMappingURL=postgresql.js.map