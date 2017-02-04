import BaseModel from './google-maps-base'

export default class Google extends BaseModel {
  public getDistanceMatrix(zipOrCoordinates: any) {
    console.log(zipOrCoordinates)
    const url = `origins=41.43206,-81.38992&destinations=11435&mode=driving&sensor=false`
    return this.connector.fetch(url)
  }
}
