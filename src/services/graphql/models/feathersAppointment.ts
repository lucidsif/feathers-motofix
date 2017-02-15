/**
 * Created by Sif on 2/13/17.
 */
import * as rp from 'request-promise';
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
    const mechanics = {
      method: 'GET',
      uri: `http://${host}/mechanics?available=true`,
      json: true
    }
    var nearMechanics = []

    rp(mechanics)
      .then((mechanicsArr) => {
      return mechanicsArr;
    })
      .reduce((arr, mechanic) => {
        const url = `origins=${mechanic.zipcode}&destinations=${zipOrCoordinates}&mode=driving&sensor=false&units=imperial`
        const mechanicMatrixUrl = `${googleBaseURL}${url}`
        const mechanicReq = {
        method: 'GET',
          uri: mechanicMatrixUrl,
          json: true
      }
      return rp(mechanicReq)
        .then((distanceMatrixResult) => {
          console.log('ran distance matrix for mechanic: ' + mechanic.first_name)
          if (distanceMatrixResult.rows[0].elements[0].distance.value <= mechanic.travel_radius * 5280) {
            console.log(`${mechanic.first_name} is willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value/5280} away from the rider`)
            nearMechanics.push(mechanic)
          } else {
            console.log(`${mechanic.first_name} did not meet predicate. willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value/5280} away from the rider`)
          }
      })
    }, Promise.resolve())
      .then(() => {
      return nearMechanics;
      })
      .reduce((arr, nearMechanic) => {
      // return an array of appointments and schedules for each near mechanic
        const mechanicScheduleUrl = `http://${host}/mechanicschedules?fk_mechanic_id=${nearMechanic.id}`
        const mechanicScheduleReq = {
          method: 'GET',
          uri: mechanicScheduleUrl,
          json: true
        }

        const mechanicAppointmentUrl = `http://${host}/appointments?fk_mechanic_id=${nearMechanic.id}`
        const mechanicAppointmentReq = {
          method: 'GET',
          uri: mechanicAppointmentUrl,
          json: true
        }

        const mechanicSchedulePromise = rp(mechanicScheduleReq)
        const mechanicAppointmentPromise = rp(mechanicAppointmentReq)
        const mechanicPromises = [mechanicSchedulePromise, mechanicAppointmentPromise]
        return Promise.all(mechanicPromises)

      }, Promise.resolve())
      .then((results) => {
      console.log(results)
      return results;
      })
      .catch((err) => {
      console.log(err)
    })

  }
}


