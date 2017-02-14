/**
 * Created by Sif on 2/13/17.
 */
const Promise = require('bluebird')
const rp = Promise.promisify(require('request-promise'))
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';
const googleBaseURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?'


export default class Appointment {
  public app: any

  constructor(app){
    this.app = app
  }
  // get arr of available mechanics
  // run google distance matrix query on each mechanic
  // if mechanic has acceptable distance matrix, return mechanic
  // for each returned mechanic, get their schedules and their appointments

  public getAppointments(zipOrCoordinates?: any){
    console.log(zipOrCoordinates);
    const mechanics = {
      method: 'GET',
      uri: `http://${host}/mechanics?available=true`,
      json: true
    }
    let allMechanics
    rp(mechanics)
      .then((mechanicsArr) => {
      allMechanics = mechanicsArr.body;
      const distanceMatrixPromises = allMechanics.map((mechanic) => {
        const url = `origins=${mechanic.zipcode}&destinations=${zipOrCoordinates}&mode=driving&sensor=false&units=imperial`
        const mechanicMatrixUrl = `${googleBaseURL}${url}`
        const mechanicReq = {
          method: 'GET',
          uri: mechanicMatrixUrl,
          json: true
        }
        return rp(mechanicReq)
      })
      return distanceMatrixPromises // should be an array of promises
    })
      .filter((promiseResultObj) => {
      if(promiseResultObj.body.rows[0].elements[0].distance.value <= 79200){
        return promiseResultObj
      }
    })
      .then((nearMechanics) => {
      const extract = nearMechanics.map((obj) => {
        return obj.body
      })
        console.log(extract)
      })
      .catch((err) => {
      console.log(err)
      })



  }
}


