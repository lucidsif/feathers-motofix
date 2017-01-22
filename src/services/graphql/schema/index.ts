import root from './root'
import starship from './starship'
import vehicle from './vehicle'
import part from './part'
import labor from './labor'
import user from './user'
import authPayload from './authPayload'

import model from './model'

//import film from './film'
//import people from './people'
//import planet from './planet'
//import vehicle from './vehicle'
//import species from './species'

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

  model
//  film,
//  people,
//  planet,
//  species,
//  vehicle,
]
