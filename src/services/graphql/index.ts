const hooks = require('./hooks');

import * as bodyParser from 'body-parser'
import * as apollo from 'apollo-server'
const gqlTools = require('graphql-tools');

import typeDefs from './schema/index'
import resolvers from './resolvers/index'
import SWAPIConnector from './connectors/swapi'
import EBAYConnector from './connectors/ebay'
import AUTODATAConnector from './connectors/autodata'

import LaborModel from './models/labor'
import StarshipModel from './models/starship'
import PartModel from './models/part'
import { VehicleModel } from './models/sql'
import UserModel from './models/feathersUser'

import OpticsAgent from 'optics-agent';
OpticsAgent.configureAgent({ apiKey: 'service:apollo-boilerplate:C1eurtOys51IglSKs_jR-Q'})

const swapiHost = process.env.SWAPI_HOST ? `${process.env.API_HOST}/api` : 'http://swapi.co/api'
const ebayHost = process.env.EBAY_HOST ? `${process.env.API_HOST}/api` : `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&`
const autoDataHost = process.env.AUTODATA_HOST ? `${process.env.API_HOST}/api` : `https://api.autodata-group.com/docs/motorcycles/v1`

const swapiConnector = new SWAPIConnector(swapiHost);
const ebayConnector = new EBAYConnector(ebayHost);
const autoDataConnector = new AUTODATAConnector(autoDataHost);


module.exports = function(){
  const app = this;
 // console.log(app)

  const logger = { log: (e) => console.log(e) };

  const schema = gqlTools.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
    logger: logger,
    allowUndefinedInResolve: true,
  })

  OpticsAgent.instrumentSchema(schema);
  app.use(OpticsAgent.middleware());
  app.use(bodyParser.json())

  app.use('/graphql', apollo.apolloExpress((req) => {
    let {token, provider} = req['feathers'];
    console.log(provider, token)
    return ({
      pretty: true,
      schema: schema,
      context: {
        starship: new StarshipModel(swapiConnector),
        part: new PartModel(ebayConnector),
        labor: new LaborModel(autoDataConnector),
        vehicle: new VehicleModel,
        opticsContext: OpticsAgent.context(req),
        token,
        provider,
        user: new UserModel(app)
      },
    })}));

  app.use('/graphiql', apollo.graphiqlExpress({
    endpointURL: '/graphql',
  }))

};

