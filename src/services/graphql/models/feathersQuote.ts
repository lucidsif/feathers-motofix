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

  public getQuotes(token?: string){
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

  public createQuote(token?: string, motorcycleJSON?: any, cartJSON?: any, partJSON?: any){
    console.log(cartJSON)
    console.log(partJSON)
    const options = {
      method: 'POST',
      uri: `http://localhost:3000/quotes`,
      headers: {
        authorization: token
      },
      body: {
        motorcycle_json: motorcycleJSON,
        cart_json: cartJSON,
        part_json: partJSON
      },
        json: true
      }

      return rp(options)
        .then((response) => {
          console.log('quote creation success')
          console.log(response)
          return response
        })
        .catch((e) => {
          console.log(e)
        })
  }

}

