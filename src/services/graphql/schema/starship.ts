export default `

type Starship implements Node {
  name: String
  model: String
  starshipClass: String
  manufacturers: [String]
  costInCredits: Float
  length: Float
  crew: String
  passengers: String
  maxAtmospheringSpeed: Int
  hyperdriveRating: Float
  MGLT: Int
  cargoCapacity: Float
  consumables: String
  created: String
  edited: String
  id: ID!
}
`

/*
export default `

type Starship implements Node {
  name: String
  model: String
  starshipClass: String
  manufacturers: [String]
  costInCredits: Float
  length: Float
  crew: String
  passengers: String
  maxAtmospheringSpeed: Int
  hyperdriveRating: Float
  MGLT: Int
  cargoCapacity: Float
  consumables: String
  pilots: [Person]
  films: [Film]
  created: String
  edited: String
  id: ID!
}
`
*/
