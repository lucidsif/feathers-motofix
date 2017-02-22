"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `

type RootQuery {
  node(id: ID!): Node
  allStarships(offset: Int, limit: Int): [Starship]
  starship(id: ID, starshipID: ID): Starship
  searchParts(vehicle: String!, service: String!, midID: String!): [Part]
  allVehicles(offset: Int, limit: Int, filterByYear: String, filterByMake: String): [Vehicle]
  validateToken(token: String!): User
  allUserQuotes(token: String!): [Quote]
  allUserAppointments(fk_user_id: Int!): [Appointment]
  
  allModels(manufacturer: String!): [Model]
  allSubModels(modelID: Int!): [SubModel]
  allRepairTimes(midID: String!): Labor
  allLubricantsAndCapacities(midID: String!): LubricantsAndCapacities
  
  checkDistance(zipOrCoordinates: String!): DistanceMatrix
  allNearAppointmentsAndSchedules(zipOrCoordinates: String!): AppointmentSchedule
}

type RootMutation {
  signUp (email: String!, password: String!): User
  logIn (email: String!, password: String!): AuthPayload
  createUserQuote(token: String!, motorcycleJSON: JSON!, cartJSON: JSON!, partJSON: JSON!, useOwnParts: Boolean! ): Quote
  createUserAppointment(
    token: String!,
    motorcycle_address: String!, 
    estimated_start_time: String!, 
    estimated_end_time: String!, 
    status: String!, 
    fk_quote_id: Int!,  
    fk_mechanic_id: Int!
  ): Appointment
  createStripeCharge(token: JSON!): StripeResponse
 }
`;
//# sourceMappingURL=root.js.map