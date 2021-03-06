"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const destination_addresses = (distanceMatrix) => distanceMatrix.destination_addresses;
const origin_addresses = (distanceMatrix) => distanceMatrix.origin_addresses;
const rows = (distanceMatrix) => distanceMatrix.rows;
const status = (distanceMatrix) => distanceMatrix.status;
exports.default = {
    DistanceMatrix: {
        destination_addresses,
        origin_addresses,
        rows,
        status
    }
};
//# sourceMappingURL=distance-matrix.js.map