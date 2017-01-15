import root from './root'
import starship from './starship'
import motorcycle from './motorcycle'
import part from './part'
import labor from './labor'
//import film from './film'
//import people from './people'
//import planet from './planet'
//import vehicle from './vehicle'
//import species from './species'

const schema = `
  schema {
    query: RootQuery
  }
`

export default [
  schema,
  root,
  starship,
  motorcycle,
  part,
  labor
//  film,
//  people,
//  planet,
//  species,
//  vehicle,
]
