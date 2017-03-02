"use strict";
const hooks = require('./hooks');
const bodyParser = require("body-parser");
const apollo = require("apollo-server");
const gqlTools = require('graphql-tools');
const index_1 = require("./schema/index");
const index_2 = require("./resolvers/index");
const swapi_1 = require("./connectors/swapi");
const ebay_1 = require("./connectors/ebay");
const autodata_1 = require("./connectors/autodata");
const google_1 = require("./connectors/google");
const auto_data_1 = require("./models/auto-data");
const starship_1 = require("./models/starship");
const part_1 = require("./models/part");
const sql_1 = require("./models/sql");
const feathersUser_1 = require("./models/feathersUser");
const feathersQuote_1 = require("./models/feathersQuote");
const feathersAppointmentsAndSchedules_1 = require("./models/feathersAppointmentsAndSchedules");
const google_maps_1 = require("./models/google-maps");
const stripe_1 = require("./models/stripe");
const vauchar_1 = require("./models/vauchar");
const optics_agent_1 = require("optics-agent");
optics_agent_1.default.configureAgent({ apiKey: 'service:apollo-boilerplate:C1eurtOys51IglSKs_jR-Q' });
const swapiHost = process.env.SWAPI_HOST ? `${process.env.API_HOST}/api` : 'http://swapi.co/api';
const ebayHost = process.env.EBAY_HOST ? `${process.env.API_HOST}/api` : `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&`;
const autoDataHost = process.env.AUTODATA_HOST ? `${process.env.API_HOST}/api` : `https://api.autodata-group.com/docs/motorcycles/v1`;
const googleHost = process.env.AUTODATA_HOST ? `${process.env.API_HOST}/api` : `http://maps.googleapis.com/maps/api/distancematrix/json?`;
const swapiConnector = new swapi_1.default(swapiHost);
const ebayConnector = new ebay_1.default(ebayHost);
const autoDataConnector = new autodata_1.default(autoDataHost);
const googleConnector = new google_1.default(googleHost);
module.exports = function () {
    const app = this;
    const logger = { log: (e) => console.log(e) };
    const schema = gqlTools.makeExecutableSchema({
        typeDefs: index_1.default,
        resolvers: index_2.default,
        logger: logger,
        allowUndefinedInResolve: true,
    });
    optics_agent_1.default.instrumentSchema(schema);
    app.use(optics_agent_1.default.middleware());
    app.use(bodyParser.json());
    app.use('/graphql', apollo.apolloExpress((req) => {
        let { token, provider } = req['feathers'];
        console.log(provider, token);
        return ({
            pretty: true,
            schema: schema,
            context: {
                starship: new starship_1.default(swapiConnector),
                part: new part_1.default(ebayConnector),
                autoData: new auto_data_1.default(autoDataConnector),
                vehicle: new sql_1.VehicleModel,
                opticsContext: optics_agent_1.default.context(req),
                token,
                provider,
                user: new feathersUser_1.default(app),
                quote: new feathersQuote_1.default(app),
                appointment: new feathersAppointmentsAndSchedules_1.default(app),
                google: new google_maps_1.default(googleConnector),
                stripe: new stripe_1.default(app),
                vauchar: new vauchar_1.default()
            },
        });
    }));
    app.use('/graphiql', apollo.graphiqlExpress({
        endpointURL: '/graphql',
    }));
};
//# sourceMappingURL=index.js.map