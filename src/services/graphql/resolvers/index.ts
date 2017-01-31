import rootQuery from './root'
import starship from './starship'
import vehicle from './vehicle'
import part from './part'
import labor from './labor'
import authPayload from './authPayload'
import quote from './quote'

// autodata
import model from './model'
import subModel from './sub-model'
import lubricantsAndCapacities from './lubricants_and_capacities'

//import film from './film'
//import people from './people'
//import planet from './planet'
//import species from './species'
//import vehicle from './vehicle'


export default Object.assign(
  rootQuery,
  starship,
  vehicle,
  part,
  labor,
  authPayload,
  quote,
// autodata
  model,
  subModel,
  lubricantsAndCapacities
)
