/**
 * Created by Sif on 2/13/17.
 */
import * as rp from 'request-promise';
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';

export default class Appointment {
  public app: any

  constructor(app){
    this.app = app
  }

  public getAppointments(zipOrCoordinates?: string){
    console.log(zipOrCoordinates);
    const options = {
      method: 'GET',
      uri: `http://${host}/appointments`,
      json: true
    }

    return rp(options)
      .then((response) => {
      console.log('appointment query success')
        console.log(response)
        return response
      })
      .catch((e) => {
      console.log(e)
      })
  }
}
