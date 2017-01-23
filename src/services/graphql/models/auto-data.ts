import BaseModel from './autoDataBase';

export default class AutoData extends BaseModel {

  public getModels(manufacturer?: string){
    return this.connector.fetchModels('/', manufacturer)
  }

  public getSubModels(modelID?: number){
    return this.connector.fetchSubModels('/', modelID)
  }

  public getRepairTimes(midID?: string){
    return this.connector.fetchRepairTimes('/', midID)
  }

  public getLubricantsAndCapacities(midID?: string){
    return this.connector.fetchLubricantsAndCapacities('/', midID)
  }

  public getEstimate(){
    const url = `/`
    return this.connector.fetch(url)
  }

}
