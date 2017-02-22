"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type MechanicSchedule implements Node {
  id: ID!
  day_of_week: String!,
  start_time: String!,
  end_time: String!,
  break_start: String!,
  break_end: String!,
  available: Boolean!,
  fk_mechanic_id: Int!
  }
`;
//# sourceMappingURL=mechanic-schedule.js.map