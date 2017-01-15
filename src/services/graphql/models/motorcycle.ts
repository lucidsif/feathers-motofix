import BaseModel from './base';

// TODO: create and import the motofix base instead of base model

export default class Motorcycle extends BaseModel {

  public getMotorcycles(offset?: number, limit?: number, filterByYear?: number | string, filterByMake?: string){
    return this.connector.fetchPage('/vehicles/', offset, limit, filterByYear, filterByMake)
  }

  public getMotorcycle(id: string, motorcycleID: number){
    const url = `/vehicles/${motorcycleID}`
    return this.connector.fetch(url)
  }
}
