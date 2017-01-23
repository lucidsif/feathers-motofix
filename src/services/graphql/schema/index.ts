import root from './root'
import starship from './starship'
import vehicle from './vehicle'
import part from './part'
import labor from './labor'
import user from './user'
import authPayload from './authPayload'

import model from './model'
import subModel from './sub-model'
import lubricantsAndCapacities from './lubricants_and_capacities'

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

  model,
  subModel,
  lubricantsAndCapacities
//  film,
//  people,
//  planet,
//  species,
//  vehicle,
]
