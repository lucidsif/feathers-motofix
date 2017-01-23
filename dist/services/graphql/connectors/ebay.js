"use strict";
const request = require("request");
const rp = require("request-promise");
const DataLoader = require('dataloader');
const ebayURL = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=';
const autoDataURL = 'https://api.autodata-group.com/docs/motorcycles/v1/';
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
    fetchPage(resource, vehicle, service, midID) {
        console.log(`params sent to fetchPage are vehicle: ${vehicle}, service: ${service}, and mid: ${midID}`);
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
            let imageURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0] || null;
            let ebayURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0];
            let shippingCost = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost[0];
            let price = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0];
            let condition = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].condition[1];
            servicePartsObj[partName] = { searchStatus, partTitle, imageURL, ebayURL, shippingCost, price, condition };
        }
        function fetchLubricantsAndCapacities(midID) {
            var getLubricationURL = `${autoDataURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getLubricationURL)
                .then((result) => {
                console.log(`rp'd url: ${getLubricationURL} with midID: ${midID}`);
                let parsedResult = JSON.parse(result);
                let lubricantsAndCapacities = parsedResult.data[0].technical_data_groups;
                return lubricantsAndCapacities;
            })
                .catch((e) => {
                console.log('failed, so mock data');
                let obj = JSON.stringify({ data: [{ oilSpec: "5w-40" }, { filter: "Ninja OEM" }] });
                console.log(obj);
                return obj;
            });
        }
        if (service === "OilChange") {
            var servicePartsObj = { OilFilter: null, EngineOil: null };
            function getOilParts() {
                console.log('OilChange parts queries will be fetched');
                console.log(resource);
                return rp(`${ebayURL}${createURLKeywords(vehicle, 'oil filter')}`).then((data) => {
                    destructureAndConstructPart(data, 'OilFilter');
                })
                    .then((nextService) => {
                    return rp(`${ebayURL}${createURLKeywords('', 'synthetic motorcycle oil 1L')}`).then((data) => {
                        destructureAndConstructPart(data, 'EngineOil');
                        const stringifiedObj = JSON.stringify(servicePartsObj);
                        return [stringifiedObj];
                    });
                })
                    .catch((e) => {
                    console.log(e);
                });
            }
            return getOilParts();
        }
        else {
            return ["no service recognized"];
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SWAPIConnector;
//# sourceMappingURL=ebay.js.map