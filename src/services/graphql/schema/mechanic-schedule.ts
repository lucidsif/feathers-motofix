/**
 * Created by Sif on 2/15/17.
 */
export default `
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
`
