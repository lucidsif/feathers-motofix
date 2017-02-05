import BaseModel from './google-maps-base'

export default class Google extends BaseModel {
  public getDistanceMatrix(zipOrCoordinates: any) {
    const mechanicZip = 11435
    const url = `origins=${mechanicZip}&destinations=${zipOrCoordinates}&mode=driving&sensor=false`
    return new Promise((resolve, reject) => {
      resolve(this.connector.fetch(url))
    })
      .then((result) => {
        return result
      })
      .catch((err) => {
      console.log(err)
        return err
      })
  }
}
