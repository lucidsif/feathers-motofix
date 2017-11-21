"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const config = require("../knexfile.js");
const env = process.env.ENVIRONMENT || 'development';
exports.default = knex(config[env]);
//# sourceMappingURL=postgresql.js.map