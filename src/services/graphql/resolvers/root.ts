// query
const allStarships = (_, params, context) => context.starship.getStarships(params.offset, params.limit)
const starship = (_, params, context) => context.starship.getStarship(params.id, params.starshipID)
const searchParts = (_, params, context) => context.part.getParts(params.vehicle, params.service, params.midID)
const allVehicles = (_, params, context) => context.vehicle.getVehicles(params.offset, params.limit, params.filterByYear, params.filterByMake)
const node = (id: number) => ({})
// feathers
const validateToken = (_, params, context) => context.user.postToken(params.token)
const allUserQuotes = (_, params, context) => context.quote.getQuotes(params.token)
// autodata
const allModels = (_, params, context) => context.autoData.getModels(params.manufacturer)
const allSubModels = (_, params, context) => context.autoData.getSubModels(params.modelID)
const allRepairTimes = (_, params, context) => context.autoData.getRepairTimes(params.midID)
const allLubricantsAndCapacities = (_, params, context) => context.autoData.getLubricantsAndCapacities(params.midID)
// feathers mutations
const signUp = (_, params, context) => context.user.createUser(params.email, params.password)
const logIn = (_, params, context) => context.user.logIn(params.email, params.password)
const createUserQuote = (_, params, context) => context.quote.createQuote(params.token, params.motorcycleJSON, params.cartJSON, params.partJSON)
// google maps
const checkDistance = (_, params, context) => context.google.getDistanceMatrix(params.zipOrCoordinates)


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
    // autodata
    allModels,
    allSubModels,
    allRepairTimes,
    allLubricantsAndCapacities,
    checkDistance,
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
    createUserQuote
  },
}
