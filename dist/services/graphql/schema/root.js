"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `

interface Node {
  id: ID!
}

type RootQuery {
  node(id: ID!): Node
  allStarships(offset: Int, limit: Int): [Starship]
  starship(id: ID, starshipID: ID): Starship
  searchParts(vehicle: String, service: String, midID: String): [Part]
  allVehicles(offset: Int, limit: Int, filterByYear: String, filterByMake: String): [Vehicle]
  validateToken(token: String): User
  
  allModels(manufacturer: String): [Model]
  allSubModels(modelID: Int): [SubModel]
  allRepairTimes(midID: String): Labor
  allLubricantsAndCapacities(midID: String): LubricantsAndCapacities

}

type RootMutation {
  signUp (
    email: String!
    password: String!
  ): User
  
  logIn (
    email: String!
    password: String!
  ): AuthPayload
}
`;
//# sourceMappingURL=root.js.map