// TODO: define all required parameters

export default `

type RootQuery {
  node(id: ID!): Node
  allStarships(offset: Int, limit: Int): [Starship]
  starship(id: ID, starshipID: ID): Starship
  searchParts(vehicle: String!, service: String!, midID: String!): [Part]
  allVehicles(offset: Int, limit: Int, filterByMake: String, filterByModel: String, filterBySubmodel: String): [Vehicle]
  validateToken(token: String!): User
  allUserQuotes(token: String!): [Quote]
  allUserAppointments(fk_user_id: Int!): [Appointment]
  
  allModels(manufacturer: String!): [Model]
  allSubModels(modelID: Int!): [SubModel]
  allRepairTimes(midID: String!): Labor
  allLubricantsAndCapacities(midID: String!): LubricantsAndCapacities
  
  checkDistance(zipOrCoordinates: String!): DistanceMatrix
  allNearAppointmentsAndSchedules(zipOrCoordinates: String!): AppointmentSchedule
  
  validateVoucher(voucherCode: String!): Voucher
}

type RootMutation {
  signUp (email: String!, password: String!, name: String!): User
  logIn (email: String!, password: String!): AuthPayload
  createUserQuote(token: String!, motorcycleJSON: JSON!, cartJSON: JSON!, partJSON: JSON!, useOwnParts: Boolean!, voucherCodeStatus: Boolean! ): Quote
  createCustomQuote(motorcycle: String!, location: String!, services: String!, notes: String, email: String!, completed: Boolean!): CustomQuote
  createUserAppointment(
    token: String!,
    motorcycle_address: String!, 
    contact_number: String!,
    note: String!,
    estimated_start_time: String!, 
    estimated_end_time: String!, 
    status: String!, 
    fk_quote_id: Int!,  
    fk_mechanic_id: Int!
  ): Appointment
  createStripeCharge(token: JSON!): StripeResponse
  
  redeemVoucher(voucherCode: String!, user_id: Int!): Voucher
 }
`

/* export default `

interface Node {
  id: ID!
}

type RootQuery {
  allFilms(offset: Int, limit: Int): [Film]
  film(id: ID, filmID: ID): Film
  allPeople(offset: Int, limit: Int): [Person]
  person(id: ID, personID: ID): Person
  allPlanets(offset: Int, limit: Int): [Planet]
  planet(id: ID, planetID: ID): Planet
  allSpecies(offset: Int, limit: Int): [Species]
  species(id: ID, speciesID: ID): Species
  allStarships(offset: Int, limit: Int): [Starship]
  starship(id: ID, starshipID: ID): Starship
  allVehicles(offset: Int, limit: Int ): [Vehicle]
  vehicle(id: ID, vehicleID: ID): Vehicle
  allMotorcycles(offset: Int, limit: Int, filterByYear: String, filterByMake: String): [Motorcycle]
  motorcycle(id: ID, motorcycleID: ID): Motorcycle
  node(id: ID!): Node
}

`
*/
