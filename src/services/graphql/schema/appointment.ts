/**
 * Created by Sif on 2/13/17.
 */
export default `
  type Appointment implements Node {
  id: ID!
  motorcycle_address: String!
  estimated_start_time: String!
  estimated_end_time: String!
  status: String!
  fk_quote_id: Int
  fk_mechanic_id: Int
  fk_user_id: Int
  }
`
