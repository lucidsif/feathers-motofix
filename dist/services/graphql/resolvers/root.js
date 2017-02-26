"use strict";
const allStarships = (_, params, context) => context.starship.getStarships(params.offset, params.limit);
const starship = (_, params, context) => context.starship.getStarship(params.id, params.starshipID);
const searchParts = (_, params, context) => context.part.getParts(params.vehicle, params.service, params.midID);
const allVehicles = (_, params, context) => context.vehicle.getVehicles(params.offset, params.limit, params.filterByYear, params.filterByMake);
const node = (id) => ({});
const validateToken = (_, params, context) => context.user.postToken(params.token);
const allUserQuotes = (_, params, context) => context.quote.getQuotes(params.token);
const allUserAppointments = (_, params, context) => context.appointment.getUserAppointments(params.fk_user_id);
const allNearAppointmentsAndSchedules = (_, params, context) => context.appointment.getAppointments(params.zipOrCoordinates);
const allModels = (_, params, context) => context.autoData.getModels(params.manufacturer);
const allSubModels = (_, params, context) => context.autoData.getSubModels(params.modelID);
const allRepairTimes = (_, params, context) => context.autoData.getRepairTimes(params.midID);
const allLubricantsAndCapacities = (_, params, context) => context.autoData.getLubricantsAndCapacities(params.midID);
const signUp = (_, params, context) => context.user.createUser(params.email, params.password);
const logIn = (_, params, context) => context.user.logIn(params.email, params.password);
const createUserQuote = (_, params, context) => context.quote.createQuote(params.token, params.motorcycleJSON, params.cartJSON, params.partJSON, params.useOwnParts);
const createUserAppointment = (_, params, context) => context.appointment.createAppointment(params.token, params.motorcycle_address, params.contact_number, params.estimated_start_time, params.estimated_end_time, params.status, params.fk_quote_id, params.fk_mechanic_id);
const checkDistance = (_, params, context) => context.google.getDistanceMatrix(params.zipOrCoordinates);
const createStripeCharge = (_, params, context) => context.stripe.createCharge(params.token);
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
        allUserAppointments,
        allNearAppointmentsAndSchedules,
        allModels,
        allSubModels,
        allRepairTimes,
        allLubricantsAndCapacities,
        checkDistance,
    },
    RootMutation: {
        signUp,
        logIn,
        createUserQuote,
        createUserAppointment,
        createStripeCharge
    },
};
//# sourceMappingURL=root.js.map