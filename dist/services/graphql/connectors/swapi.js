"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    fetchPage(resource, offset, limit) {
        let results = [];
        let index = 0;
        const size = limit || 0;
        function pagination(pageURL) {
            return new Promise((resolve, reject) => {
                this.fetch(pageURL).then((data) => {
                    if (offset && results.length === 0) {
                        if (index + data.results.length > offset) {
                            results = data.results.slice(offset - index);
                        }
                        if (data.next) {
                            index = index + data.results.length;
                            pagination.call(this, data.next).then(resolve);
                        }
                        else {
                            resolve(results);
                        }
                    }
                    else {
                        if (size > 0 && size - results.length - data.results.length < 0) {
                            results = results.concat(data.results.slice(0, size - results.length));
                        }
                        else {
                            results = results.concat(data.results);
                        }
                        if (data.next && (size === 0 || size - results.length > 0)) {
                            pagination.call(this, data.next).then(resolve);
                        }
                        else {
                            resolve(results);
                        }
                    }
                });
            });
        }
        return pagination.call(this, resource);
    }
}
exports.default = SWAPIConnector;
//# sourceMappingURL=swapi.js.map