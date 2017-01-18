"use strict";
const allStarships = (_, params, context) => context.starship.getStarships(params.offset, params.limit);
const starship = (_, params, context) => context.starship.getStarship(params.id, params.starshipID);
const allMotorcycles = (_, params, context) => context.motorcycle.getMotorcycles(params.offset, params.limit, params.filterByYear, params.filterByMake);
const motorcycle = (_, params, context) => context.motorcycle.getMotorcycle(params.id, params.motorcycleID);
const searchParts = (_, params, context) => context.part.getParts(params.vehicle, params.service);
const laborEstimates = (_, params, context) => context.labor.getEstimates(params.year, params.make, params.model, params.service);
const allVehicles = (_, params, context) => context.vehicle.getVehicles(params.offset, params.limit, params.filterByYear, params.filterByMake);
const node = (id) => ({});
const validateToken = (_, params, context) => context.user.postToken(params.token);
const signUp = (_, params, context) => context.user.createUser(params.email, params.password);
const logIn = (_, params, context) => context.user.logIn(params.email, params.password);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    RootQuery: {
        allStarships,
        starship,
        allMotorcycles,
        motorcycle,
        searchParts,
        laborEstimates,
        allVehicles,
        node,
        validateToken,
    },
    RootMutation: {
        signUp,
        logIn
    }
};
//# sourceMappingURL=root.js.map