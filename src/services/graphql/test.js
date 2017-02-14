/**
 * Created by Sif on 2/14/17.
 */
/*
const Bluebird =require('bluebird');
const rp = require('request-promise');
const googleBaseURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
const zipcodes = [11435, 11436, 11106]

const requestPromises = zipcodes.map((zipcode) => {
  const url = `${googleBaseURL}origins=${zipcode}&destinations=11435&mode=driving&sensor=false&units=imperial`
  const mechanicMatrix = {
    method: 'GET',
    uri: url,
    json: true
  }
  return rp(mechanicMatrix)
})
*/
/*
const nearMechanics = requestPromises.filter((item) => {
  rp(item).then((result) => {
    console.log(result)
  })
})
*/
/*
const mechanics = {
  method: 'GET',
  uri: `http://${host}/mechanics?available=true`,
  json: true
}

rp(mechanics).then((mechanicsArr) => {
  mechanicsArr.filter((item) => {
    console.log(item);
    return item
  })
})


**/
/*
const Promise = require('bluebird')
const rp = Promise.promisify(require('request-promise'))
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';
const googleBaseURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?'


export default class Appointment {
  public app: any

  constructor(app){
    this.app = app
  }
  // get all available mechanics => filter for mechanics who are near => for each mechanic, get their appointments

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

// problem: filter gets run before the async operations that it must apply
// to each item. Try requests first and try to create an array of promises that gets filtered



*/
