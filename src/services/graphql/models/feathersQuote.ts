/**
 * Created by Sif on 1/31/17.
 */
import * as rp from 'request-promise';

export default class Quote {
  public app: any
  // app is the feathersJS app passed to the instance of this class
  constructor(app){
    this.app = app
  }

  public getQuotes(token?: string, motorcycleJSON?: string, cartJSON?: string, partJSON?: string){
    console.log(`token: ${token}`)
    console.log(`token: ${motorcycleJSON}`)
    console.log(`token: ${cartJSON}`)
    console.log(`token: ${partJSON}`)

    const options = {
      method: 'GET',
      uri: `http://localhost:3000/quotes`,
      headers: {
        authorization: token
      },
      json: true
    }

    return rp(options)
      .then((response) => {
        console.log('quote query success')
        console.log(response)

        return response
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
