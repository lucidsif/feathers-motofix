"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../connectors/postgresql");
class VehicleModel {
    getVehicles(offset, limit, filterByMake, filterByModel, filterBySubmodel) {
        console.log(`make is: ${filterByMake}, model is: ${filterByModel}, submodel is: ${filterBySubmodel}`);
        console.time('graphql');
        if (filterByMake) {
            console.log('first');
            return postgresql_1.default('motorcycles')
                .select()
                .distinct('model')
                .where({
                make: filterByMake
            })
                .orderBy('model', 'asc')
                .then((rows) => {
                return rows;
            })
                .catch((err) => {
                console.log(err);
            });
        }
        if (filterByModel) {
            console.log('second');
            return postgresql_1.default('motorcycles')
                .select()
                .distinct('submodel')
                .where({
                model: filterByModel
            })
                .orderBy('submodel', 'asc')
                .then((rows) => {
                return rows;
            })
                .catch((err) => {
                console.log(err);
            });
        }
        if (filterBySubmodel) {
            console.log('third');
            return postgresql_1.default('motorcycles')
                .select()
                .distinct('year')
                .where({
                submodel: filterBySubmodel
            })
                .orderBy('year', 'asc')
                .then((rows) => {
                return rows;
            })
                .catch((err) => {
                console.log(err);
            });
        }
    }
}
exports.VehicleModel = VehicleModel;
//# sourceMappingURL=sql.js.map