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

  public getAppointments(zipOrCoordinates?: any){
    const mechanics = {
      method: 'GET',
      uri: `http://${host}/mechanics?available=true`,
      json: true
    }
    var nearMechanics = []
    var appointments = []
    var schedules = []

    return rp(mechanics)
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
        return rp(mechanicScheduleReq)
          .then((scheduleResults) => {
          schedules.push(scheduleResults)
        })
          .then(() => {
         return rp(mechanicAppointmentReq)
            .then((appointmentResults) => {
            appointments.push(appointmentResults)
            })
          })

      }, Promise.resolve())
      .then(() => {
      let mergedSchedules = [].concat.apply([], schedules)
      let mergedAppointments = [].concat.apply([], appointments)
        const payload = {
        schedules: mergedSchedules,
          appointments: mergedAppointments
        }
        return payload
      })
      .catch((err) => {
      console.log(err)
    })

  }

  public createAppointment(
    token?: string,
    motorcycle_address?: string,
    estimated_start_time?: string,
    estimated_end_time?: string,
    status?: string,
    fk_quote_id?: number,
    fk_mechanic_id?: number,
  ){
    console.log(token, motorcycle_address, estimated_start_time, estimated_end_time, status, fk_quote_id, fk_mechanic_id)


  }
}

