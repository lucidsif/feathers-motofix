const hooks = require('./hooks');

import * as bodyParser from 'body-parser'
import * as apollo from 'apollo-server'
const gqlTools = require('graphql-tools');


import typeDefs from './schema/index'
import resolvers from './resolvers/index'
import SWAPIConnector from './connectors/swapi'
import MOTOFIXConnector from './connectors/motofix'
import EBAYConnector from './connectors/ebay'
import AUTODATAConnector from './connectors/autodata'

import LaborModel from './models/labor'
import StarshipModel from './models/starship'
import MotorcycleModel from './models/motorcycle'
import PartModel from './models/part'
import { VehicleModel } from './models/sql';

import OpticsAgent from 'optics-agent';
OpticsAgent.configureAgent({ apiKey: 'service:apollo-boilerplate:C1eurtOys51IglSKs_jR-Q'})

const swapiHost = process.env.SWAPI_HOST ? `${process.env.API_HOST}/api` : 'http://swapi.co/api'
const motofixHost = process.env.MOTOFIX_HOST ? `${process.env.API_HOST}/api` : `http://localhost:3030`
const ebayHost = process.env.EBAY_HOST ? `${process.env.API_HOST}/api` : `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&`
const autoDataHost = process.env.AUTODATA_HOST ? `${process.env.API_HOST}/api` : `https://reqres.in/api`

const swapiConnector = new SWAPIConnector(swapiHost);
const motofixConnector = new MOTOFIXConnector(motofixHost);
const ebayConnector = new EBAYConnector(ebayHost);
const autoDataConnector = new AUTODATAConnector(autoDataHost);

//const expressPort = process.env.EXPRESS_PORT || 5000
//const app = express()

/*
app.listen(expressPort, () => {
  console.log(`Express server is listen on ${expressPort}`)
})
*/


module.exports = function(){
  const app = this;

  const logger = { log: (e) => console.log(e) };

  const schema = gqlTools.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
    logger: logger,
    allowUndefinedInResolve: false,
  })

  OpticsAgent.instrumentSchema(schema);
  app.use(OpticsAgent.middleware());
  app.use(bodyParser.json())

  app.use('/graphql', apollo.apolloExpress((req) => ({
      pretty: true,
      schema: schema,
      context: {
        motorcycle: new MotorcycleModel(motofixConnector),
        starship: new StarshipModel(swapiConnector),
        part: new PartModel(ebayConnector),
        labor: new LaborModel(autoDataConnector),
        vehicle: new VehicleModel,
        opticsContext: OpticsAgent.context(req)
      },
    })));

  app.use('/', apollo.graphiqlExpress({
    endpointURL: '/graphql',
  }))

};

