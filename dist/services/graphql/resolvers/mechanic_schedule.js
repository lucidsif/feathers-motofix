"use strict";
const id = (mechanicSchedule) => mechanicSchedule.id;
const day_of_week = (mechanicSchedule) => mechanicSchedule.day_of_week;
const start_time = (mechanicSchedule) => mechanicSchedule.start_time;
const end_time = (mechanicSchedule) => mechanicSchedule.end_time;
const break_start = (mechanicSchedule) => mechanicSchedule.break_start;
const break_end = (mechanicSchedule) => mechanicSchedule.break_end;
const available = (mechanicSchedule) => mechanicSchedule.available;
const fk_mechanic_id = (mechanicSchedule) => mechanicSchedule.fk_mechanic_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    MechanicSchedule: {
        id,
        day_of_week,
        start_time,
        end_time,
        break_start,
        break_end,
        available,
        fk_mechanic_id
    }
};
//# sourceMappingURL=mechanic_schedule.js.map