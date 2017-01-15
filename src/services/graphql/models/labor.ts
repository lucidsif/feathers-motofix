import BaseModel from './autoDataBase';

export default class Labor extends BaseModel {

  public getEstimates(vehicle?: string, service?: string){
    return this.connector.fetchPage('/users', vehicle, service)
  }

  public getEstimate(){
    const url = `/users`
    return this.connector.fetch(url)
  }

}
