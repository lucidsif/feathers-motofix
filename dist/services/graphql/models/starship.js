"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swapiBase_1 = require("./swapiBase");
class Starship extends swapiBase_1.default {
    getStarships(offset, limit) {
        return this.connector.fetchPage('/starships/', offset, limit);
    }
    getStarship(id, starshipID) {
        const url = id || `/starships/${starshipID}/`;
        return this.connector.fetch(url);
    }
}
exports.default = Starship;
//# sourceMappingURL=starship.js.map