const allStarships = (_, params, context) => context.starship.getStarships(params.offset, params.limit)
const starship = (_, params, context) => context.starship.getStarship(params.id, params.starshipID)
const allMotorcycles = (_, params, context) => context.motorcycle.getMotorcycles(params.offset, params.limit, params.filterByYear, params.filterByMake)
const motorcycle = (_, params, context) => context.motorcycle.getMotorcycle(params.id, params.motorcycleID)
const searchParts = (_, params, context) => context.part.getParts(params.vehicle, params.service)
const laborEstimates = (_, params, context) => context.labor.getEstimates(params.vehicle, params.service)
const allVehicles = (_, params, context) => context.vehicle.getVehicles(params.offset, params.limit, params.filterByYear, params.filterByMake)
const node = (id: number) => ({})
const viewer = (_, params, context) => context.user.getViewer(context) // write a model that calls Viewer.find

const signUp = (_, params, context) => context.user.createUser(params.email, params.password)
const logIn = (_, params, context) => context.user.logIn(params.email, params.password)



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
    allMotorcycles,
    motorcycle,
    searchParts,
    laborEstimates,
    allVehicles,
    node,
    viewer,
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
    logIn
  }
}
