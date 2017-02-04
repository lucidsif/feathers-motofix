"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `

type RootQuery {
  node(id: ID!): Node
  allStarships(offset: Int, limit: Int): [Starship]
  starship(id: ID, starshipID: ID): Starship
  searchParts(vehicle: String, service: String, midID: String): [Part]
  allVehicles(offset: Int, limit: Int, filterByYear: String, filterByMake: String): [Vehicle]
  validateToken(token: String): User
  allUserQuotes(token: String): [Quote]
  
  allModels(manufacturer: String): [Model]
  allSubModels(modelID: Int): [SubModel]
  allRepairTimes(midID: String): Labor
  allLubricantsAndCapacities(midID: String): LubricantsAndCapacities
  
  checkDistance(zipOrCoordinates: String): DistanceMatrix

}

type RootMutation {
  signUp (email: String!, password: String!): User
  logIn (email: String!, password: String!): AuthPayload
  createUserQuote(token: String, motorcycleJSON: JSON, cartJSON: JSON, partJSON: JSON): Quote
 }
`;
//# sourceMappingURL=root.js.map