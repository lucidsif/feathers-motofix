"use strict";
const ebayBase_1 = require("./ebayBase");
class Part extends ebayBase_1.default {
    getParts(vehicle, service, midID) {
        return this.connector.fetchPage('keywords=', vehicle, service, midID);
    }
    getPart() {
        const url = `keywords=`;
        return this.connector.fetch(url);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Part;
//# sourceMappingURL=part.js.map