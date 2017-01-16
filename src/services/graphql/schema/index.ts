import root from './root'
import starship from './starship'
import motorcycle from './motorcycle'
import part from './part'
import labor from './labor'
import user from './user'
import authPayload from './authPayload'

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
  motorcycle,
  part,
  labor,
  user,
  authPayload
//  film,
//  people,
//  planet,
//  species,
//  vehicle,
]
