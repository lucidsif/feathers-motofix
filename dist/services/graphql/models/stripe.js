"use strict";
const stripe = require('stripe')('sk_test_bKGsU9xuWYRuw7p8WlQ09yl9');
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';
class Stripe {
    constructor(app) {
        this.app = app;
    }
    createCharge(token) {
        const parsedToken = JSON.parse(token);
        return stripe.charges.create({
            amount: parsedToken.amount,
            currency: "usd",
            description: "motofix services",
            source: parsedToken.id,
        }).then((response) => {
            console.log(response);
            return {
                response,
            };
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stripe;
//# sourceMappingURL=stripe.js.map