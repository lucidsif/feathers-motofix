/**
 * Created by Sif on 1/31/17.
 */
export default `
  type Quote implements Node {
    id: ID!
    fk_users_id: Int
    motorcycle_json: JSON
    cart_json: JSON
    part_json: JSON
    createdAt: String
    updatedAt: String
  }
`
