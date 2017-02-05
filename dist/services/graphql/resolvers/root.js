"use strict";
const allStarships = (_, params, context) => context.starship.getStarships(params.offset, params.limit);
const starship = (_, params, context) => context.starship.getStarship(params.id, params.starshipID);
const searchParts = (_, params, context) => context.part.getParts(params.vehicle, params.service, params.midID);
const allVehicles = (_, params, context) => context.vehicle.getVehicles(params.offset, params.limit, params.filterByYear, params.filterByMake);
const node = (id) => ({});
const validateToken = (_, params, context) => context.user.postToken(params.token);
const allUserQuotes = (_, params, context) => context.quote.getQuotes(params.token);
const allModels = (_, params, context) => context.autoData.getModels(params.manufacturer);
const allSubModels = (_, params, context) => context.autoData.getSubModels(params.modelID);
const allRepairTimes = (_, params, context) => context.autoData.getRepairTimes(params.midID);
const allLubricantsAndCapacities = (_, params, context) => context.autoData.getLubricantsAndCapacities(params.midID);
const signUp = (_, params, context) => context.user.createUser(params.email, params.password);
const logIn = (_, params, context) => context.user.logIn(params.email, params.password);
const createUserQuote = (_, params, context) => context.quote.createQuote(params.token, params.motorcycleJSON, params.cartJSON, params.partJSON);
const checkDistance = (_, params, context) => context.google.getDistanceMatrix(params.zipOrCoordinates);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    RootQuery: {
        allStarships,
        starship,
        searchParts,
        allVehicles,
        node,
        validateToken,
        allUserQuotes,
        allModels,
        allSubModels,
        allRepairTimes,
        allLubricantsAndCapacities,
        checkDistance,
    },
    RootMutation: {
        signUp,
        logIn,
        createUserQuote
    },
};
//# sourceMappingURL=root.js.map