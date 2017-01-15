import knex from '../connectors/postgresql';

export class VehicleModel {
    public getVehicles(offset?: number, limit?: number, filterByYear?: number | string, filterByMake?: string) {
        console.log(`make is: ${filterByMake}, year is: ${filterByYear}`)
        console.time('graphql')
        //return distinct models based on year and make
        if(filterByYear && filterByMake){
            //noinspection TsLint
            return knex('vehicle')
                .select()
                .distinct('model')
                .where({
                    year: filterByYear,
                    make: filterByMake
                })
                .orderBy('model', 'asc')
                .then((rows) => {
                    return rows
                })
                .catch((err) => {
                })
        }
        // return distinct makes based on year
        if(filterByYear && !filterByMake){
            return knex('vehicle')
                .select()
                .distinct('make')
                .where({
                    year: filterByYear
                })
                .orderBy('make', 'asc')
                .then((rows) => {
                return rows
                })
                .catch((err) => {
                })
        }
    }
}
