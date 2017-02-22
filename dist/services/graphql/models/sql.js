"use strict";
const postgresql_1 = require("../connectors/postgresql");
class VehicleModel {
    getVehicles(offset, limit, filterByYear, filterByMake) {
        console.log(`make is: ${filterByMake}, year is: ${filterByYear}`);
        console.time('graphql');
        if (filterByYear && filterByMake) {
            return postgresql_1.default('vehicle')
                .select()
                .distinct('model')
                .where({
                year: filterByYear,
                make: filterByMake
            })
                .orderBy('model', 'asc')
                .then((rows) => {
                return rows;
            })
                .catch((err) => {
            });
        }
        if (filterByYear && !filterByMake) {
            return postgresql_1.default('vehicle')
                .select()
                .distinct('make')
                .where({
                year: filterByYear
            })
                .orderBy('make', 'asc')
                .then((rows) => {
                return rows;
            })
                .catch((err) => {
            });
        }
    }
}
exports.VehicleModel = VehicleModel;
//# sourceMappingURL=sql.js.map