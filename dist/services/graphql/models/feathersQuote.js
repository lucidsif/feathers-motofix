"use strict";
const rp = require("request-promise");
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';
class Quote {
    constructor(app) {
        this.app = app;
    }
    getQuotes(token) {
        const options = {
            method: 'GET',
            uri: `http://${host}/quotes`,
            headers: {
                authorization: token
            },
            json: true
        };
        return rp(options)
            .then((response) => {
            console.log('quote query success');
            console.log(response);
            return response;
        })
            .catch((e) => {
            console.log(e);
        });
    }
    createQuote(token, motorcycleJSON, cartJSON, partJSON, useOwnParts) {
        const options = {
            method: 'POST',
            uri: `http://${host}/quotes`,
            headers: {
                authorization: token
            },
            body: {
                motorcycle_json: motorcycleJSON,
                cart_json: cartJSON,
                part_json: partJSON,
                use_own_parts: useOwnParts
            },
            json: true
        };
        return rp(options)
            .then((response) => {
            console.log('quote creation success');
            console.log(response);
            return response;
        })
            .catch((e) => {
            console.log(e);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Quote;
//# sourceMappingURL=feathersQuote.js.map