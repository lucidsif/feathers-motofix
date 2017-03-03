"use strict";
const id = (appointment) => appointment.id;
const motorcycle_address = (appointment) => appointment.motorcycle_address;
const contact_number = (appointment) => appointment.contact_number;
const note = (appointment) => appointment.note;
const estimated_start_time = (appointment) => appointment.estimated_start_time;
const estimated_end_time = (appointment) => appointment.estimated_end_time;
const status = (appointment) => appointment.status;
const fk_quote_id = (appointment) => appointment.fk_quote_id;
const fk_mechanic_id = (appointment) => appointment.fk_mechanic_id;
const fk_user_id = (appointment) => appointment.fk_user_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Appointment: {
        id,
        motorcycle_address,
        contact_number,
        note,
        estimated_start_time,
        estimated_end_time,
        status,
        fk_quote_id,
        fk_mechanic_id,
        fk_user_id
    }
};
//# sourceMappingURL=appointment.js.map