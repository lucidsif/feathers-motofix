// query
const allStarships = (_, params, context) => context.starship.getStarships(params.offset, params.limit)
const starship = (_, params, context) => context.starship.getStarship(params.id, params.starshipID)
const searchParts = (_, params, context) => context.part.getParts(params.vehicle, params.service, params.midID)
const allVehicles = (_, params, context) => context.vehicle.getVehicles(params.offset, params.limit, params.filterByMake, params.filterByModel, params.filterBySubmodel)
const node = (id: number) => ({})
// feathers
const validateToken = (_, params, context) => context.user.postToken(params.token)
const allUserQuotes = (_, params, context) => context.quote.getQuotes(params.token)
const allUserAppointments = (_, params, context) => context.appointment.getUserAppointments(params.fk_user_id)

const allNearAppointmentsAndSchedules = (_, params, context) => context.appointment.getAppointments(params.zipOrCoordinates)
// autodata
const allModels = (_, params, context) => context.autoData.getModels(params.manufacturer)
const allSubModels = (_, params, context) => context.autoData.getSubModels(params.modelID)
const allRepairTimes = (_, params, context) => context.autoData.getRepairTimes(params.midID)
const allLubricantsAndCapacities = (_, params, context) => context.autoData.getLubricantsAndCapacities(params.midID)
// feathers mutations
const signUp = (_, params, context) => context.user.createUser(params.email, params.password, params.name)
const logIn = (_, params, context) => context.user.logIn(params.email, params.password)
const createUserQuote = (_, params, context) => context.quote.createQuote(params.token, params.motorcycleJSON, params.cartJSON, params.partJSON, params.useOwnParts, params.voucherCodeStatus)
const createCustomQuote = (_, params, context) => context.quote.createCustomQuote(params.motorcycle, params.location, params.services, params.notes, params.email, params.completed)
const createUserAppointment = (_, params, context) => context.appointment.createAppointment(
  params.token,
  params.motorcycle_address,
  params.contact_number,
  params.note,
  params.estimated_start_time,
  params.estimated_end_time,
  params.status,
  params.fk_quote_id,
  params.fk_mechanic_id,
)
// google maps
const checkDistance = (_, params, context) => context.google.getDistanceMatrix(params.zipOrCoordinates)
//stripe
const createStripeCharge = (_, params, context) => context.stripe.createCharge(params.token)
//vauchar
const validateVoucher =  (_, params, context) => context.vauchar.validateVoucherCode(params.voucherCode)
const redeemVoucher = (_, params, context) => context.vauchar.createVoucherRedemption(params.voucherCode, params.user_id)


// const allFilms = (_, params, context) => context.film.getFilms(params.offset, params.limit)
// const film = (_, params, context) => context.film.getFilm(params.id, params.filmID)
// const person = (_, params, context) => context.people.getPeople(params.id, params.personID)
// const allPeople = (_, params, context) => context.people.getPeoples(params.offset, params.limit)
// const allPlanets = (_, params, context) => context.planet.getPlanets(params.offset, params.limit)
// const planet = (_, params, context) => context.planet.getPlanet(params.id, params.planetID)
// const allSpecies = (_, params, context) => context.species.getAllSpecies(params.offset, params.limit)
// const species = (_, params, context) => context.species.getSpecies(params.id, params.speciesID)
// const allVehicles = (_, params, context) => context.vehicle.getVehicles(params.offset, params.limit)
// const vehicle = (_, params, context) => context.vehicle.getVehicle(params.id, params.vehicleID)

export default {
  RootQuery: {
    allStarships,
    starship,
    searchParts,
    allVehicles,
    node,
    // feathers
    validateToken,
    allUserQuotes,
    allUserAppointments,

    allNearAppointmentsAndSchedules,
    // autodata
    allModels,
    allSubModels,
    allRepairTimes,
    allLubricantsAndCapacities,
    checkDistance,
    validateVoucher
//    allFilms,
//    film,
//    allPeople,
//    person,
//    allPlanets,
//    planet,
//    allSpecies,
//    species,
//    allVehicles,
//    vehicle,
  },
  RootMutation: {
    signUp,
    logIn,
    createUserQuote,
    createCustomQuote,
    createUserAppointment,
    createStripeCharge,
    redeemVoucher
  },
}
