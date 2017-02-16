/**
 * Created by Sif on 2/13/17.
 */
/**
 * Created by Sif on 1/31/17.
 */
const id = (appointment) => appointment.id
const estimated_start_time = (appointment) => appointment.estimated_start_time
const estimated_end_time = (appointment) => appointment.estimated_end_time

export default {
  Appointment: {
    id,
    estimated_start_time,
    estimated_end_time
  }
}
