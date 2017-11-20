"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';
class User {
    constructor(app) {
        this.app = app;
    }
    createUser(email, password, name) {
        console.log('createuser parameters: ' + email + ',' + password);
        let Users = this.app['service']('users');
        let args = { email, password, name };
        return Users.create(args).then((response) => {
            console.log(response);
            return response.dataValues;
        })
            .catch((e) => {
            console.log(e);
        });
    }
    logIn(email, password) {
        const options = {
            method: 'POST',
            uri: `http://${host}/auth/local`,
            body: { email, password },
            json: true
        };
        return rp(options)
            .then((response) => {
            console.log('login mutation success');
            console.log(response);
            return response;
        })
            .catch((e) => {
            console.log(e);
        });
    }
    postToken(token) {
        const jwtOptions = {
            method: 'POST',
            uri: `http://${host}/auth/token`,
            headers: {
                authorization: token
            },
            json: true
        };
        return rp(jwtOptions)
            .then((response) => {
            console.log('getViewer query success');
            console.log(response);
            return response.data;
        })
            .catch((e) => {
            console.log(e);
        });
    }
}
exports.default = User;
//# sourceMappingURL=feathersUser.js.map