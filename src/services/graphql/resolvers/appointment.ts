/**
 * Created by Sif on 2/13/17.
 */
/**
 * Created by Sif on 1/31/17.
 */
const id = (appointment) => appointment.id
const motorcycle_address = (appointment) => appointment.motorcycle_address
const estimated_start_time = (appointment) => appointment.estimated_start_time
const estimated_end_time = (appointment) => appointment.estimated_end_time
const contact_number = (appointment) => appointment.contact_number
const status = (appointment) => appointment.status
const fk_quote_id = (appointment) => appointment.fk_quote_id
const fk_mechanic_id = (appointment) => appointment.fk_mechanic_id
const fk_user_id = (appointment) => appointment.fk_user_id

export default {
  Appointment: {
    id,
    motorcycle_address,
    estimated_start_time,
    estimated_end_time,
    contact_number,
    status,
    fk_quote_id,
    fk_mechanic_id,
    fk_user_id
  }
}
