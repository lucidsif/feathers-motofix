import knex from '../connectors/postgresql';

export class VehicleModel {
    public getVehicles(offset?: number, limit?: number, filterByMake?: string, filterByModel?: string, filterBySubmodel?: string) {
        console.log(`make is: ${filterByMake}, model is: ${filterByModel}, submodel is: ${filterBySubmodel}`)
        console.time('graphql')
        //return distinct models
        if(filterByMake){
          console.log('first')
            //noinspection TsLint
            return knex('motorcycles')
                .select()
                .distinct('model')
                .where({
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
        // return distinct submodels
        if(filterByModel){
          console.log('second')
            return knex('motorcycles')
                .select()
                .distinct('submodel')
                .where({
                    model: filterByModel
                })
                .orderBy('submodel', 'asc')
                .then((rows) => {
                return rows
                })
                .catch((err) => {
            console.log(err);
                })
        }
        // return distinct years
        if(filterBySubmodel){
          console.log('third')
            return knex('motorcycles')
                .select()
                .distinct('year')
                .where({
                    submodel: filterBySubmodel
                })
                .orderBy('year', 'asc')
                .then((rows) => {
                return rows
                })
                .catch((err) => {
            console.log(err);
                })
        }
    }
}
