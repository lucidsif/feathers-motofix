/**
 * Created by Sif on 1/31/17.
 */

import * as rp from 'request-promise';
// use production env or local
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';

export default class Quote {
  public app: any
  // app is the feathersJS app passed to the instance of this class
  constructor(app){
    this.app = app
  }

  public getQuotes(token?: string){
    const options = {
      method: 'GET',
      uri: `http://${host}/quotes`,
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
// run slack webhook after quote posted and add quote id to slack message
  public createQuote(token?: string, motorcycleJSON?: any, cartJSON?: any, partJSON?: any, useOwnParts?: any, voucherCodeStatus?: any){
    const options = {
      method: 'POST',
      uri: `http://${host}/quotes`,
      headers: {
        authorization: token,
      },
      body: {
        motorcycle_json: motorcycleJSON,
        cart_json: cartJSON,
        part_json: partJSON,
        use_own_parts: useOwnParts,
        voucher_code_status: voucherCodeStatus
      },
        json: true
      }

    const slackOptions = {
      method: 'POST',
      uri: 'https://hooks.slack.com/services/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',
      body: {
        "text" : `Motorcycle: ${motorcycleJSON} \ncart:${cartJSON} \npart${partJSON}`
      },
      json: true
    }

    rp(slackOptions)
      .then((result) => {
        console.log(result);
      });

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

  public createCustomQuote(motorcycle?: string, location?: string, services?: string, notes?: string, email?: string, completed?: boolean) {
    //console.log(motorcycle, location, services, notes, email, completed)
    const options = {
      method: 'POST',
      uri: `http://${host}/customquotes`,
      body: {
        motorcycle,
        location,
        services,
        notes,
        email,
        completed
      },
      json: true
    }

    const slackOptions = {
      method: 'POST',
      uri: 'https://hooks.slack.com/services/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',
      body: {
        "text" : `motorcycle: ${motorcycle} \nlocation: ${location} \nservices: ${services} \nnotes: ${notes} \nemail: ${email}`
      },
      json: true
    }

    rp(slackOptions)
      .then((result) => {
        console.log(result);
      });

    return rp(options)
      .then((response) => {
        console.log('custom quote creation success')
        console.log(response)
        return response
      })
      .catch((e) => {
        console.log(e)
      })

  }

}

