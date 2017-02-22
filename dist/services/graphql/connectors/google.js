"use strict";
const request = require("request");
const DataLoader = require('dataloader');
class SWAPIConnector {
    constructor(rootURL) {
        this.rootURL = rootURL;
        this.loader = new DataLoader((urls) => {
            const promises = urls.map((url) => {
                return this.fetch(url);
            });
            return Promise.all(promises);
        }, { batch: false });
    }
    fetch(resource) {
        const url = resource.indexOf(this.rootURL) === 0 ? resource : this.rootURL + resource;
        return new Promise((resolve, reject) => {
            console.log(`fetch: ${url}`);
            request.get(url, (err, resp, body) => {
                console.log(`fetch: ${url} completed`);
                err ? reject(err) : resolve(JSON.parse(body));
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SWAPIConnector;
//# sourceMappingURL=google.js.map