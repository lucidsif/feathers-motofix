/**
 * Created by Sif on 2/20/17.
 */
const stripe = require('stripe')('sk_test_bKGsU9xuWYRuw7p8WlQ09yl9');

// use production env or local
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';

export default class Stripe {
  public app: any

  constructor(app){
    this.app = app
  }

  public createCharge(token: any) {
    const parsedToken = JSON.parse(token);
    return stripe.charges.create({
      amount: parsedToken.amount,
      currency: "usd",
      description: "motofix services",
      source: parsedToken.id,
    }).then((response) => {
      console.log(response)
      return {
        response,
      }
    }).catch((err) => {
      console.log(err)
      return err
    })
  }
}
