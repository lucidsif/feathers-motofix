"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id = (starship) => starship.url;
const costInCredits = (starship) => starship.cost_in_credits;
const maxAtmospheringSpeed = (starship) => starship.max_atmosphering_speed;
const cargoCapacity = (starship) => starship.cargo_capacity;
const hyperdriveRating = (starship) => starship.hyperdrive_rating;
const starshipClass = (starship) => starship.starship_class;
exports.default = {
    Starship: {
        id,
        costInCredits,
        maxAtmospheringSpeed,
        cargoCapacity,
        hyperdriveRating,
        starshipClass,
    },
};
//# sourceMappingURL=starship.js.map