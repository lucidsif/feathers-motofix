/**
 * Created by Sif on 1/31/17.
 */
const id = (quote) => quote.id
const fk_users_id = (quote) => quote.fk_users_id
const motorcycle_json = (quote) => quote.motorcycle_json
const cart_json = (quote) => quote.part_json
const part_json = (quote) => quote.part_json
const createdAt = (quote) => quote.createdAt
const updatedAt = (quote) => quote.updatedAt


export default {
  Quote: {
    id,
    fk_users_id,
    motorcycle_json,
    cart_json,
    part_json,
    createdAt,
    updatedAt
  }
}
