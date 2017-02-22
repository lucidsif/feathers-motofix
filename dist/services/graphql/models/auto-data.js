"use strict";
const autoDataBase_1 = require("./autoDataBase");
class AutoData extends autoDataBase_1.default {
    getModels(manufacturer) {
        return this.connector.fetchModels('/', manufacturer);
    }
    getSubModels(modelID) {
        return this.connector.fetchSubModels('/', modelID);
    }
    getRepairTimes(midID) {
        return this.connector.fetchRepairTimes('/', midID);
    }
    getLubricantsAndCapacities(midID) {
        return this.connector.fetchLubricantsAndCapacities('/', midID);
    }
    getEstimate() {
        const url = `/`;
        return this.connector.fetch(url);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AutoData;
//# sourceMappingURL=auto-data.js.map