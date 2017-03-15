import knex from '../connectors/postgresql';
// TODO: Redesign queries to support quoteaddvehicle dropdowns
export class VehicleModel {
    public getVehicles(offset?: number, limit?: number, filterByYear?: number | string, filterByMake?: string) {
        console.log(`make is: ${filterByMake}, year is: ${filterByYear}`)
        console.time('graphql')
        //return distinct models based on year and make
        if(filterByYear && filterByMake){
          console.log('first')
            //noinspection TsLint
            return knex('motorcycles')
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
            console.log(err);
                })
        }
        // return distinct makes based on year
        if(filterByYear && !filterByMake){
          console.log('second')
            return knex('motorcycles')
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
            console.log(err);
                })
        }
    }
}
