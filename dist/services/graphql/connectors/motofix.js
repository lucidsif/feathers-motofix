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
    fetchPage(resource, offset, limit, filterByYear, filterByMake, keywords) {
        filterByYear = Number(filterByYear);
        console.log(filterByMake);
        let yearFilteredBikes = [];
        let uniqueYearFilteredBikes = [];
        let makeFilteredBikes = [];
        let uniqueMakeFilteredBikes = [];
        function removeDuplicates(myArr, prop) {
            return myArr.filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            });
        }
        return new Promise((resolve, reject) => {
            this.fetch(resource).then((data) => {
                if (filterByYear) {
                    console.log(`filterByYear ran with year: ${filterByYear}`);
                    yearFilteredBikes = data.filter((bike) => {
                        if (bike.year === filterByYear) {
                            return bike;
                        }
                    });
                    uniqueYearFilteredBikes = removeDuplicates(yearFilteredBikes, "make");
                    if (filterByMake) {
                        console.log('filterByMake ran');
                        let arr = uniqueYearFilteredBikes || data;
                        makeFilteredBikes = yearFilteredBikes.filter((bike) => {
                            if (bike.make.toLowerCase() === filterByMake.toLowerCase()) {
                                return bike;
                            }
                        });
                        uniqueMakeFilteredBikes = removeDuplicates(makeFilteredBikes, "model");
                        resolve(uniqueMakeFilteredBikes);
                    }
                    resolve(uniqueYearFilteredBikes);
                }
                else if (filterByMake) {
                    console.log('filterByMake ran');
                    makeFilteredBikes = data.filter((bike) => {
                        if (bike.make.toLowerCase() === filterByMake.toLowerCase()) {
                            return bike;
                        }
                    });
                    uniqueMakeFilteredBikes = removeDuplicates(makeFilteredBikes, "model");
                    resolve(uniqueMakeFilteredBikes);
                }
                else {
                    console.log('no filter params were ran');
                    resolve(data);
                }
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SWAPIConnector;
//# sourceMappingURL=motofix.js.map