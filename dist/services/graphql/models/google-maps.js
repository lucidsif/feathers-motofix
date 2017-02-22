"use strict";
const google_maps_base_1 = require("./google-maps-base");
class Google extends google_maps_base_1.default {
    getDistanceMatrix(zipOrCoordinates) {
        const mechanicZip = 11435;
        const url = `origins=${mechanicZip}&destinations=${zipOrCoordinates}&mode=driving&sensor=false&units=imperial`;
        return new Promise((resolve, reject) => {
            resolve(this.connector.fetch(url));
        })
            .then((result) => {
            return result;
        })
            .catch((err) => {
            console.log(err);
            return err;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Google;
//# sourceMappingURL=google-maps.js.map