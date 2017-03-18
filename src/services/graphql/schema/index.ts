import root from './root'
import starship from './starship'
import vehicle from './vehicle'
import part from './part'
import labor from './labor'
import user from './user'
import authPayload from './authPayload'
import quote from './quote'
import customQuote from './custom-quote'

import model from './model'
import subModel from './sub-model'
import lubricantsAndCapacities from './lubricants_and_capacities'

import distanceMatrix from './distance-matrix'
import appointment from './appointment'
import mechanicSchedule from './mechanic-schedule'
import appointmentSchedule from './appointment-schedule'

import stripeResponse from './stripe-response'

import voucher from './voucher'

//import film from './film'
//import people from './people'
//import planet from './planet'
//import vehicle from './vehicle'
//import species from './species'
// TODO: Change name of labor to repairTimes

const schema = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  
  interface Node {
  id: ID!
}

  scalar JSON
`;

export default [
  schema,
  root,
  starship,
  vehicle,
  part,
  labor,
  user,
  authPayload,
  quote,
  customQuote,

  model,
  subModel,
  lubricantsAndCapacities,

  distanceMatrix,
  appointment,
  mechanicSchedule,
  appointmentSchedule,

  stripeResponse,
  voucher
//  film,
//  people,
//  planet,
//  species,
//  vehicle,
]
