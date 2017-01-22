import BaseModel from './autoDataBase';

export default class Labor extends BaseModel {

  public getModels(manufacturer?: string){
    return this.connector.fetchModels('/', manufacturer)
  }

  public getEstimates(year?: string, make?: string, model?: string, service?: string){
    return this.connector.fetchPage('/', year, make, model, service)
  }

  public getEstimate(){
    const url = `/`
    return this.connector.fetch(url)
  }

}
