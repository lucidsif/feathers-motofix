"use strict";
const request = require("request");
const rp = require("request-promise");
const Fuse = require('fuse.js');
const DataLoader = require('dataloader');
const manufacturerCodes = [{ "Aprilia": "APR" }, { "Arctic Cat": "ARC" }, { "Benelli": "BEN" }, { "BMW": "BMM" }, { "BSA": "BSA" }, { "Buell": "BUE" }, { "Cagiva": "CAG" }, { "Can-Am": "CAA" }, { "Cannondale": "CAN" }, { "CZ": "CZ-" }, { "Derbi": "DER" }, { "Ducati": "DUC" }, { "EBR Motorcycles": "EBR" }, { "Enfield": "ENF" }, { "Eurospeed": "EUR" }, { "Gas Gas": "GGS" }, { "Harley-Davidson": "HAR" }, { "Honda": "HDA" }, { "Husqvarna": "HUS" }, { "Hyosung": "HYO" }, { "Indian": "IND" }, { "Italjet": "ITA" }, { "Jawa": "JAW" }, { "Kawasaki": "KAW" }, { "Keeway": "KEE" }, { "KTM": "KTM" }, { "Kymco": "KYM" }, { "Laverda": "LAV" }, { "Morini": "MOR" }, { "Moto Guzzi": "MOT" }, { "MV Agusta": "MVA" }, { "MZ/MUZ": "MZ-" }, { "Piaggio": "PIA" }, { "Polaris": "POL" }, { "Suzuki": "SZK" }, { "SYM": "SYM" }, { "TGB": "TGB" }, { "Triumph": "TRI" }, { "Ural": "URA" }, { "Victory": "VIC" }, { "Indian": "IND" }, { "Italjet": "ITA" }, { "Jawa": "JAW" }, { "Kawasaki": "KAW" }, { "Keeway": "KEE" }, { "KTM": "KTM" }, { "Kymco": "KYM" }, { "Laverda": "LAV" }, { "Morini": "MOR" }, { "Moto Guzzi": "MOT" }, { "MV Agusta": "MVA" }, { "MZ/MUZ": "MZ-" }, { "Piaggio": "PIA" }, { "Polaris": "POL" }, { "Suzuki": "SZK" }, { "SYM": "SYM" }, { "TGB": "TGB" }, { "Triumph": "TRI" }, { "Ural": "URA" }, { "Victory": "VIC" }];
const baseURL = 'https://api.autodata-group.com/docs/motorcycles/v1/';
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
    isJsonString(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            console.log('not valid json');
            return false;
        }
        return true;
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
        console.log(manufacturerID);
        function getModels() {
            var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getModelURL)
                .then((result) => {
                console.log(`rp'd url: ${getModelURL}`);
                let parsedResult = JSON.parse(result);
                return parsedResult.data.models;
            })
                .catch((e) => {
                console.log(`failed getModelIdByManufacturer: ${getModelURL}`);
                return JSON.stringify({ service: 'model array not found', time: 0.01 });
            });
        }
        return getModels();
    }
    fetchSubModels(resource, modelID) {
        function getSubModels() {
            console.log(`modelid: ${modelID}`);
            var getMidURL = `${baseURL}vehicles?model_id=${modelID}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            console.time('submodel');
            return rp(getMidURL)
                .then((result) => {
                console.log(`rp'd url: ${getMidURL}`);
                let parsedResult = JSON.parse(result);
                console.timeEnd('submodel');
                return parsedResult.data;
            })
                .catch((e) => {
                console.log(`failed getMidIDByModelId: ${getMidURL}`);
                return JSON.stringify({ service: 'mid not found', time: 0.01 });
            });
        }
        return getSubModels();
    }
    fetchRepairTimes(resource, midID) {
        console.log(`midID: ${midID}`);
        var variantID;
        function getVariantIDByMidID() {
            console.log(`mid: ${midID}`);
            var getVariantIDURL = `${baseURL}vehicles/${midID}/repair-times?country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
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
                .catch((e) => {
                console.log(`failed getVariantIDByMidID: ${getVariantIDURL}`);
                return JSON.stringify({ service: 'variant not found', time: 0.01 });
            });
        }
        function getRepairTimesByVariantAndMid(n) {
            console.log(` arguments received for getRepairTimes are midID: ${midID}, variantID: ${variantID}`);
            var getRepairTimesURL = `${baseURL}vehicles/${midID}/repair-times/${variantID}?parts=no&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getRepairTimesURL)
                .then((result) => {
                console.log(`rp'd url: ${getRepairTimesURL} with midID: ${midID} and variantID: ${variantID}`);
                let parsedResult = JSON.parse(result);
                let repairTimesObj = parsedResult.data.repair_times;
                return JSON.stringify(repairTimesObj);
            })
                .catch((e) => {
                console.log(`failed getRepairTimesByVariantAndMid: ${getRepairTimesURL}`);
                return JSON.stringify({ data: [{ laborTime: 0.0 }, { laborTime: 0.0 }], unavailable: true });
            });
        }
        function delayBuffer(n) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('delay buffer of 250ms');
                    resolve('balls');
                }, 250);
            });
        }
        function pSeries(list) {
            var p = Promise.resolve();
            return list.reduce((pacc, fn) => {
                return pacc = pacc.then(fn);
            }, p);
        }
        const fnList = [getVariantIDByMidID, delayBuffer, getRepairTimesByVariantAndMid];
        return pSeries(fnList);
    }
    fetchLubricantsAndCapacities(resource, midID) {
        console.log(`midid: ${midID}`);
        var getLubricationURL = `${baseURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AUTODATAConnector;
//# sourceMappingURL=autodata.js.map