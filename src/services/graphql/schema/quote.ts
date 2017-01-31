/**
 * Created by Sif on 1/31/17.
 */
export default `
  type Quote implements Node {
    id: ID!
    fk_users_id: Int
    motorcycle_json: String
    cart_json: String
    part_json: String
    createdAt: String
    updatedAt: String
  }
`
