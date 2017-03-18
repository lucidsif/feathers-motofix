const GraphQLJSON = require('graphql-type-json');

import rootQuery from './root'
import starship from './starship'
import vehicle from './vehicle'
import part from './part'
import labor from './labor'
import authPayload from './authPayload'
import quote from './quote'
import customQuote from './custom-quote'
import appointment from './appointment'
import mechanicSchedule from './mechanic_schedule'
import appointmentSchedule from './appointment-schedule'

// autodata
import model from './model'
import subModel from './sub-model'
import lubricantsAndCapacities from './lubricants_and_capacities'

//google
import distanceMatrix from './distance-matrix'

//stripe
import stripeResponse from './stripe-response'

//vauchar
import voucher from './voucher';

//import film from './film'
//import people from './people'
//import planet from './planet'
//import species from './species'
//import vehicle from './vehicle'

const obj = { JSON: GraphQLJSON };

export default Object.assign(
  obj,
  rootQuery,
  starship,
  vehicle,
  part,
  labor,
  authPayload,
  quote,
  customQuote,
  appointment,
  mechanicSchedule,
  appointmentSchedule,
// autodata
  model,
  subModel,
  lubricantsAndCapacities,
  //google
  distanceMatrix,
  //stripe
  stripeResponse,
  //vauchar
  voucher
)
