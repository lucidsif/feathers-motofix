/**
 * Created by Sif on 2/13/17.
 */
import * as rp from 'request-promise';
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';
const googleBaseURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

// TODO: add error handling if google maps api fails
export default class Appointment {
  public app: any

  constructor(app){
    this.app = app
  }
// get all available mechanics who are willing to travel the distance they listed and among those, return an array of mechanics with their schedules and appointments
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
            if (distanceMatrixResult.rows[0].elements[0].distance.value <= mechanic.travel_radius * 1.61) {
              console.log(`${mechanic.first_name} is willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value/1609.34} away from the rider`)
              nearMechanics.push(mechanic)
            } else {
              console.log(`${mechanic.first_name} did not meet predicate. willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value/1609.34} away from the rider`)
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
  // TODO: modularize createAppointment and getOwnAppointments by exporting to a different model
  public createAppointment(
    token?: string,
    motorcycle_address?: string,
    contact_number?: string,
    note?: string,
    estimated_start_time?: string,
    estimated_end_time?: string,
    status?: string,
    fk_quote_id?: number,
    fk_mechanic_id?: number,
  ){
    //console.log(token, motorcycle_address, contact_number, note, estimated_start_time, estimated_end_time, status, fk_quote_id, fk_mechanic_id)

    const options = {
      method: 'POST',
      uri: `http://${host}/appointments`,
      headers: {
        authorization: token,
      },
      body: {
        motorcycle_address,
        contact_number,
        note,
        estimated_start_time,
        estimated_end_time,
        status,
        fk_quote_id,
        fk_mechanic_id
      },
      json: true
    }

    const slackOptions = {
      method: 'POST',
      uri: 'https://hooks.slack.com/services/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',
      body: {
        "text" : `Mechanic: ${fk_mechanic_id} \nEstimated start time:${estimated_start_time} \nMotorcycle Address: ${motorcycle_address}. \nNotes: ${note} \nCustomer contact number: ${contact_number}`
      },
      json: true
    }

    rp(slackOptions)
      .then((result) => {
        console.log(result);
      });

    return rp(options)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        console.log(e)
        return e;
      })
  }

  public getUserAppointments(fk_user_id?: number){

    const options = {
      method: 'GET',
      uri: `http://${host}/appointments?fk_user_id=${fk_user_id}`,
      json: true
    }

    return rp(options)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
