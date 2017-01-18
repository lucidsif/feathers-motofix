import BaseModel from './autoDataBase';

export default class Labor extends BaseModel {

  public getEstimates(year?: string, make?: string, model?: string, service?: string){
    return this.connector.fetchPage('/', year, make, model, service)
  }

  public getEstimate(){
    const url = `/`
    return this.connector.fetch(url)
  }

}
