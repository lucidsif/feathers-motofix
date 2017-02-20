'use strict';

const hooks = require('./hooks');
const stripe = require('stripe')('sk_test_bKGsU9xuWYRuw7p8WlQ09yl9');


class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }
// TODO: collect token and all other information to process
  create(data, params) {
    console.log(data);
    console.log(params);
    stripe.customers.create({
      email: 'foo-customer2@example.com'
    }).then(function(customer){
      return stripe.customers.createSource(customer.id, {
        source: {
          object: 'card',
          exp_month: 10,
          exp_year: 2018,
          number: '4242 4242 4242 4242',
          cvc: 100
        }
      });
    }).then(function(source) {
      return stripe.charges.create({
        amount: 1700,
        currency: 'usd',
        customer: source.customer
      });
    }).then(function(charge) {
      console.log('charge');
      console.log(charge);
      // New charge created on a new customer
      //console.log(charge);
      return charge;
    }).catch(function(err) {
      console.log(charge);
      // Deal with an error
    });

  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/stripes', new Service());

  // Get our initialize service to that we can bind hooks
  const stripeService = app.service('/stripes');

  // Set up our before hooks
  stripeService.before(hooks.before);

  // Set up our after hooks
  stripeService.after(hooks.after);
};

module.exports.Service = Service;
