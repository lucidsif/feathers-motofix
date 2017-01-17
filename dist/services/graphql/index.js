"use strict";
const hooks = require('./hooks');
const bodyParser = require("body-parser");
const apollo = require("apollo-server");
const gqlTools = require('graphql-tools');
const index_1 = require("./schema/index");
const index_2 = require("./resolvers/index");
const swapi_1 = require("./connectors/swapi");
const motofix_1 = require("./connectors/motofix");
const ebay_1 = require("./connectors/ebay");
const autodata_1 = require("./connectors/autodata");
const labor_1 = require("./models/labor");
const starship_1 = require("./models/starship");
const motorcycle_1 = require("./models/motorcycle");
const part_1 = require("./models/part");
const sql_1 = require("./models/sql");
const feathersUser_1 = require("./models/feathersUser");
const optics_agent_1 = require("optics-agent");
optics_agent_1.default.configureAgent({ apiKey: 'service:apollo-boilerplate:C1eurtOys51IglSKs_jR-Q' });
const swapiHost = process.env.SWAPI_HOST ? `${process.env.API_HOST}/api` : 'http://swapi.co/api';
const motofixHost = process.env.MOTOFIX_HOST ? `${process.env.API_HOST}/api` : `http://localhost:3030`;
const ebayHost = process.env.EBAY_HOST ? `${process.env.API_HOST}/api` : `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&`;
const autoDataHost = process.env.AUTODATA_HOST ? `${process.env.API_HOST}/api` : `https://reqres.in/api`;
const swapiConnector = new swapi_1.default(swapiHost);
const motofixConnector = new motofix_1.default(motofixHost);
const ebayConnector = new ebay_1.default(ebayHost);
const autoDataConnector = new autodata_1.default(autoDataHost);
module.exports = function () {
    const app = this;
    const logger = { log: (e) => console.log(e) };
    const schema = gqlTools.makeExecutableSchema({
        typeDefs: index_1.default,
        resolvers: index_2.default,
        logger: logger,
        allowUndefinedInResolve: false
    });
    optics_agent_1.default.instrumentSchema(schema);
    app.use(optics_agent_1.default.middleware());
    app.use(bodyParser.json());
    app.use('/graphql', apollo.apolloExpress((req) => {
        console.log(req['feathers']);
        let { token, provider } = req['feathers'];
        console.log('token is: ' + req['feathers']['token']);
        console.log('provider is: ' + req['feathers']['provider']);
        return ({
            pretty: true,
            schema: schema,
            context: {
                motorcycle: new motorcycle_1.default(motofixConnector),
                starship: new starship_1.default(swapiConnector),
                part: new part_1.default(ebayConnector),
                labor: new labor_1.default(autoDataConnector),
                vehicle: new sql_1.VehicleModel,
                opticsContext: optics_agent_1.default.context(req),
                token: req['feathers']['token'],
                provider: req['feathers']['provider'],
                user: new feathersUser_1.default(app)
            },
        });
    }));
    app.use('/graphiql', apollo.graphiqlExpress({
        endpointURL: '/graphql',
    }));
};
//# sourceMappingURL=index.js.map