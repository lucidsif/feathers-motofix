"use strict";
const request = require("request");
const rp = require("request-promise");
const DataLoader = require('dataloader');
const ebayURL = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=';
const buyerPostalCode = '&buyerPostalCode=11435';
const buyItNowFilter = `&itemFilter(0).name=ListingType&itemFilter(0).value=FixedPrice`;
const maxPriceFilter = '&itemFilter(1).name=MaxPrice&itemFilter(1).value=';
const maxDistanceFilter = '&itemFilter(2).name=MaxDistance&itemFilter(2).value=3200';
const autoDataURL = 'https://api.autodata-group.com/docs/motorcycles/v1/';
const autoDataAPIKey = 'f';
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
        function createURLKeywords(vehicleModel, partName, partSpec) {
            var keywords;
            if (partSpec) {
                keywords = `&${partName} ${partSpec}`;
                let URLkeywords = encodeURIComponent(keywords.trim());
                console.log(`URLKeywords are ${URLkeywords}`);
                return URLkeywords;
            }
            else {
                keywords = `&${partName} ${vehicleModel}`;
                let URLkeywords = encodeURIComponent(keywords.trim());
                console.log(`URLKeywords are ${URLkeywords}`);
                return URLkeywords;
            }
        }
        function destructureEbayDataAndConstructPart(partsJSON, partName) {
            let partsObj = JSON.parse(partsJSON);
            let searchResult = partsObj.findItemsByKeywordsResponse[0].searchResult[0]["@count"];
            console.log('searchresults: ' + searchResult);
            if (searchResult > 0) {
                try {
                    let valid = true;
                    let partTitle = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0];
                    let imageURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0];
                    let ebayURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0];
                    let shippingCost = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].shippingInfo;
                    let price = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0];
                    let condition = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].condition[1];
                    let quantity = 1;
                    servicePartsObj[partName] = { valid, partTitle, imageURL, ebayURL, shippingCost, price, condition, quantity };
                    console.log(servicePartsObj[partName]);
                }
                catch (e) {
                    console.log('json extracting problem during part construction');
                    console.log(e);
                    servicePartsObj[partName] = { valid: false };
                }
            }
            else {
                servicePartsObj[partName] = { valid: false };
                console.log(servicePartsObj);
            }
        }
        function fetchOilChangePartsSeries(list) {
            var p = Promise.resolve();
            return list.reduce((pacc, fn) => {
                return pacc = pacc.then(fn);
            }, p);
        }
        function fetchLubricantsAndCapacities() {
            var getLubricationURL = `${autoDataURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getLubricationURL)
                .then((result) => {
                console.log(`rp'd url: ${getLubricationURL} with midID: ${midID}`);
                let parsedResult = JSON.parse(result);
                let lubricantsAndCapacities = parsedResult.data[0].technical_data_groups;
                return lubricantsAndCapacities;
            })
                .catch((e) => {
                console.log(`failed lubesandcapacities url: ${getLubricationURL} with midID: ${midID}`);
                console.log(e.statusCode);
                return { data: [{ oilSpec: "10w-30" }, { filter: "Ninja OEM" }] };
            });
        }
        if (service === "OilChange") {
            var servicePartsObj = { OilFilter: { valid: false }, EngineOil: { valid: false } };
            var oilWeight;
            var oilVolume;
            var oilQuantity;
            let oilFilterURL;
            let oilURL;
            function getOilParts(lubricantsAndCapacities) {
                console.log(lubricantsAndCapacities);
                if (!lubricantsAndCapacities.length) {
                    console.log('err conditional met');
                    let stringifiedObj = JSON.stringify(servicePartsObj);
                    return [stringifiedObj];
                }
                const lubricantsAndCapacitiesGroup = lubricantsAndCapacities[0].group_items;
                let oilWeightGroup = lubricantsAndCapacitiesGroup.filter((group) => {
                    return group.description === 'Engine oil grade';
                });
                let oilVolumeGroup = lubricantsAndCapacitiesGroup.filter((group) => {
                    return group.description === 'Engine oil with filter';
                });
                oilWeight = oilWeightGroup[0].other;
                oilVolume = 1;
                oilQuantity = oilVolumeGroup[0].value;
                console.log(`oil weight extracted: ${oilWeight}`);
                console.log(`oil volume extracted: ${oilVolume}`);
                console.log(`oil quantity in units of oil volume: ${oilQuantity}`);
                let oilFilterMaxPriceValue = 20;
                oilFilterURL = `${ebayURL}${createURLKeywords(vehicle, 'oil filter', '')}${buyerPostalCode}${buyItNowFilter}${maxPriceFilter}${oilFilterMaxPriceValue}${maxDistanceFilter}`;
                return rp(oilFilterURL)
                    .then((data) => {
                    console.log(`fetched: ${oilFilterURL}`);
                    destructureEbayDataAndConstructPart(data, 'OilFilter');
                })
                    .catch((e) => {
                    console.log(e);
                    console.log(`failed: ${oilFilterURL}`);
                })
                    .then(() => {
                    let oilMaxPriceValue = 10;
                    oilURL = `${ebayURL}${createURLKeywords(vehicle, 'synthetic oil', `${oilWeight} ${oilVolume} quart`)}${buyerPostalCode}${buyItNowFilter}${maxPriceFilter}${oilMaxPriceValue}${maxDistanceFilter}`;
                    return rp(oilURL)
                        .then((data) => {
                        console.log(`fetched: ${oilURL}`);
                        destructureEbayDataAndConstructPart(data, 'EngineOil');
                        const stringifiedObj = JSON.stringify(servicePartsObj);
                        servicePartsObj.OilFilter['quantity'] = Math.ceil(oilQuantity);
                        console.log('rounded oil quantity:' + Math.ceil(oilQuantity));
                        return [stringifiedObj];
                    })
                        .catch((e) => {
                        console.log(e);
                        console.log(`failed: ${oilURL}`);
                    });
                });
            }
            const oilChangeFuncs = [fetchLubricantsAndCapacities, getOilParts];
            return fetchOilChangePartsSeries(oilChangeFuncs);
        }
        else {
            return ["no service recognized"];
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SWAPIConnector;
//# sourceMappingURL=ebay.js.map