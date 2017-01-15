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
                err ? reject(err) : resolve(body);
            });
        });
    }
    fetchPage(resource, vehicle, service) {
        console.log(`params sent to fetchPage are vehicle: ${vehicle} and service: ${service}`);
        function createURLKeywords(vehicleModel, partName) {
            let keywords = `${vehicleModel} ${partName}`;
            let URLkeywords = encodeURIComponent(keywords.trim());
            console.log(`URLKeywords are ${URLkeywords}`);
            return URLkeywords;
        }
        function destructureAndConstructPart(partsJSON, partName) {
            let partsObj = JSON.parse(partsJSON);
            let searchStatus = partsObj.findItemsByKeywordsResponse[0].ack[0];
            let partTitle = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0];
            let imageURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0];
            let ebayURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0];
            let shippingCost = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost[0];
            let price = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0];
            let condition = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].condition[1];
            servicePartsObj[partName] = { searchStatus, partTitle, imageURL, ebayURL, shippingCost, price, condition };
        }
        if (service === "OilChange") {
            var servicePartsObj = { OilFilter: null, EngineOil: null };
            console.log('OilChange parts queries will be fetched');
            return new Promise((resolve, reject) => {
                this.fetch(`${resource}${createURLKeywords(vehicle, 'oil filter')}`).then((data) => {
                    destructureAndConstructPart(data, 'OilFilter');
                }).then((nextService) => {
                    this.fetch(`${resource}${createURLKeywords('', 'synthetic motorcycle oil 1L')}`).then((data) => {
                        destructureAndConstructPart(data, 'EngineOil');
                        const stringifiedObj = JSON.stringify(servicePartsObj);
                        resolve([stringifiedObj]);
                    });
                });
            });
        }
        else {
            return ["no service recognized"];
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SWAPIConnector;
//# sourceMappingURL=ebay.js.map