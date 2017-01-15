import BaseModel from './ebayBase';

export default class Part extends BaseModel {

  public getParts(vehicle?: string, service?: string){
    return this.connector.fetchPage('keywords=', vehicle, service)
  }

  public getPart(){
    const url = `keywords=`
    return this.connector.fetch(url)
  }

}
