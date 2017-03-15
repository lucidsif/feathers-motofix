"use strict";
const postgresql_1 = require("../connectors/postgresql");
class VehicleModel {
    getVehicles(offset, limit, filterByYear, filterByMake) {
        console.log(`make is: ${filterByMake}, year is: ${filterByYear}`);
        console.time('graphql');
        if (filterByYear && filterByMake) {
            console.log('first');
            return postgresql_1.default('motorcycles')
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
                console.log(err);
            });
        }
        if (filterByYear && !filterByMake) {
            console.log('second');
            return postgresql_1.default('motorcycles')
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
                console.log(err);
            });
        }
    }
}
exports.VehicleModel = VehicleModel;
//# sourceMappingURL=sql.js.map