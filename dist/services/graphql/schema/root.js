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
  allMotorcycles(offset: Int, limit: Int, filterByYear: String, filterByMake: String): [Motorcycle]
  motorcycle(id: ID, motorcycleID: ID): Motorcycle
  searchParts(vehicle: String, service: String): [Part]
  laborEstimates(year: String, make: String, model: String, service: String): Labor
  allVehicles(offset: Int, limit: Int, filterByYear: String, filterByMake: String): [Motorcycle]
  validateToken(token: String): User
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