"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const rp = require("request-promise");
const DataLoader = require('dataloader');
const promiseRetry = require('promise-retry');
const manufacturerCodes = [{ "Aprilia": "APR" }, { "Arctic Cat": "ARC" }, { "Benelli": "BEN" }, { "BMW": "BMM" }, { "BSA": "BSA" }, { "Buell": "BUE" }, { "Cagiva": "CAG" }, { "Can-Am": "CAA" }, { "Cannondale": "CAN" }, { "CZ": "CZ-" }, { "Derbi": "DER" }, { "Ducati": "DUC" }, { "EBR Motorcycles": "EBR" }, { "Enfield": "ENF" }, { "Eurospeed": "EUR" }, { "Gas Gas": "GGS" }, { "Harley-Davidson": "HAR" }, { "Honda": "HDA" }, { "Husqvarna": "HUS" }, { "Hyosung": "HYO" }, { "Indian": "IND" }, { "Italjet": "ITA" }, { "Jawa": "JAW" }, { "Kawasaki": "KAW" }, { "Keeway": "KEE" }, { "KTM": "KTM" }, { "Kymco": "KYM" }, { "Laverda": "LAV" }, { "Morini": "MOR" }, { "Moto Guzzi": "MOT" }, { "MV Agusta": "MVA" }, { "MZ/MUZ": "MZ-" }, { "Piaggio": "PIA" }, { "Polaris": "POL" }, { "Suzuki": "SZK" }, { "SYM": "SYM" }, { "TGB": "TGB" }, { "Triumph": "TRI" }, { "Ural": "URA" }, { "Victory": "VIC" }, { "Indian": "IND" }, { "Italjet": "ITA" }, { "Jawa": "JAW" }, { "Kawasaki": "KAW" }, { "Keeway": "KEE" }, { "KTM": "KTM" }, { "Kymco": "KYM" }, { "Laverda": "LAV" }, { "Morini": "MOR" }, { "Moto Guzzi": "MOT" }, { "MV Agusta": "MVA" }, { "MZ/MUZ": "MZ-" }, { "Piaggio": "PIA" }, { "Polaris": "POL" }, { "Suzuki": "SZK" }, { "SYM": "SYM" }, { "TGB": "TGB" }, { "Triumph": "TRI" }, { "Ural": "URA" }, { "Victory": "VIC" }];
const baseURL = 'https://api.autodata-group.com/docs/motorcycles/v1/';
const API_KEY = 'z66tkk6dh45n5a8mq4hvga6j';
class AUTODATAConnector {
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
    fetchModels(resource, manufacturer) {
        var manufacturerID = function () {
            var code;
            manufacturerCodes.filter((tuple) => {
                for (var manufacturerName in tuple) {
                    if (tuple[manufacturerName] === manufacturer) {
                        code = tuple[manufacturerName];
                    }
                }
            });
            if (code) {
                return code;
            }
            return JSON.stringify({ service: `${manufacturer} does not exist in autodata', time: 0.01` });
        }();
        function getModels(retry, number) {
            var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=${API_KEY}`;
            return rp(getModelURL)
                .then((result) => {
                console.log(`rp'd url: ${getModelURL}`);
                let parsedResult = JSON.parse(result);
                return parsedResult.data.models;
            })
                .catch(function (err) {
                console.log(`failed getModelIdByManufacturer: ${getModelURL}`);
                console.log(err.statusCode);
                if (err.statusCode === 403 && number <= 3) {
                    return retry(err);
                }
                return JSON.stringify({ service: 'model array not found', time: 0.01 });
            });
        }
        return promiseRetry(getModels, { retries: 3, minTimeout: 100 });
    }
    fetchSubModels(resource, modelID) {
        function getSubModels(retry, number) {
            console.log('attempt number: ' + number);
            console.log(`modelid: ${modelID}`);
            var getMidURL = `${baseURL}vehicles?model_id=${modelID}&country-code=us&page=1&limit=90&api_key=${API_KEY}`;
            console.time('submodel');
            return rp(getMidURL)
                .then((result) => {
                console.log(`rp'd url: ${getMidURL}`);
                let parsedResult = JSON.parse(result);
                console.timeEnd('submodel');
                return parsedResult.data;
            })
                .catch(function (err) {
                console.log(`failed getMidIDByModelId: ${getMidURL}`);
                console.log(err.statusCode);
                if (err.statusCode === 403 && number <= 3) {
                    return retry(err);
                }
                return JSON.stringify({ service: 'mid not found', time: 0.01 });
            });
        }
        return promiseRetry(getSubModels, { retries: 3, minTimeout: 100 });
    }
    fetchRepairTimes(resource, midID) {
        function getVariantIDByMidIDAndGetRepairTimes(retry, number) {
            var variantID;
            var getVariantIDURL = `${baseURL}vehicles/${midID}/repair-times?country-code=us&page=1&limit=90&api_key=${API_KEY}`;
            var getRepairTimesURL;
            console.log('attempt number: ' + number);
            console.log(`mid: ${midID}`);
            return rp(getVariantIDURL)
                .then((result) => {
                console.log(result);
                console.log(`rp'd url: ${getVariantIDURL} with midID: ${midID}`);
                let parsedResult = JSON.parse(result);
                variantID = parsedResult.data[0].variant_id;
                return {
                    midID,
                    variantID,
                };
            })
                .then((response) => {
                console.log(response);
                getRepairTimesURL = `${baseURL}vehicles/${midID}/repair-times/${variantID}?parts=no&country-code=us&page=1&limit=90&api_key=${API_KEY}`;
                return rp(getRepairTimesURL);
            })
                .then((repairTimes) => {
                console.log(`rp'd url: ${getRepairTimesURL} with midID: ${midID} and variantID: ${variantID}`);
                console.log(repairTimes);
                let parsedResult = JSON.parse(repairTimes);
                let repairTimesObj = parsedResult.data.repair_times;
                return JSON.stringify(repairTimesObj);
            })
                .catch(function (err) {
                console.log(`failed`);
                console.log(getVariantIDURL);
                console.log(getRepairTimesURL);
                console.log(err.statusCode);
                if (err.statusCode === 403 && number <= 3) {
                    return retry(err);
                }
                return JSON.stringify({ data: [{ laborTime: 0.0 }, { laborTime: 0.0 }], unavailable: 'limited' });
            });
        }
        return promiseRetry(getVariantIDByMidIDAndGetRepairTimes, { retries: 3, minTimeout: 100 });
    }
    fetchLubricantsAndCapacities(resource, midID) {
        console.log(`midid: ${midID}`);
        var getLubricationURL = `${baseURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=${API_KEY}`;
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
}
exports.default = AUTODATAConnector;
//# sourceMappingURL=autodata.js.map