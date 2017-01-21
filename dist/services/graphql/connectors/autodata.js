"use strict";
const request = require("request");
const rp = require("request-promise");
const search_mid_1 = require("../script/search-mid");
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
    fetchMotorcycles(resource, make, model, mid) {
        console.log(` params are make: ${make}, model:${model}, mid:${mid}`);
    }
    fetchPage(resource, year, make, model, service) {
        const services = ['Oil Change', 'Smoke or steam is coming out of motorcycle', 'NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];
        console.log(`resource is: ${resource}, service paramater is ${service} for year:${year}, make:${make}, model:${model}`);
        var modelID;
        var midID;
        var variantID;
        var lubricantsAndCapacities;
        var oilChangeLaborTime;
        var oilChangeDescription;
        var manufacturerID = function () {
            var code;
            manufacturerCodes.filter((tuple) => {
                for (var manufacturerName in tuple) {
                    if (manufacturerName === make) {
                        code = tuple[manufacturerName];
                    }
                }
            });
            if (code) {
                return code;
            }
            return JSON.stringify({ service: 'make does not exist in autodata', time: 0.01 });
        }();
        console.log(manufacturerID);
        function getModelIDByManufacturerID() {
            var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getModelURL)
                .then((result) => {
                console.log(`rp'd url: ${getModelURL}`);
                let parsedResult = JSON.parse(result);
                modelID = search_mid_1.searchForModel(parsedResult, model);
                console.log(`model returned by Fuse in getModelIdByManufacturer: ${modelID}`);
                return modelID;
            })
                .catch((e) => {
                console.log(`failed getModelIdByManufacturer: ${getModelURL}`);
                return JSON.stringify({ service: 'modelid not found', time: 0.01 });
            });
        }
        function getMidIDByModelID(n) {
            console.log(`modelid: ${modelID}`);
            var getMidURL = `${baseURL}vehicles?model_id=${modelID}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getMidURL)
                .then((result) => {
                console.log(`rp'd url: ${getMidURL}`);
                let parsedResult = JSON.parse(result);
                midID = search_mid_1.searchForMid(parsedResult, year, model);
                return midID;
            })
                .catch((e) => {
                console.log(`failed getMidIDByModelId: ${getMidURL}`);
                return JSON.stringify({ service: 'mid not found', time: 0.01 });
            });
        }
        function getVehicleDetailsByMidID(n) {
            console.log(`midid: ${midID}`);
            var getVehicleDetailsURL = `${baseURL}vehicles/${midID}?links=yes&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getVehicleDetailsURL)
                .then((result) => {
                console.log(`rp'd url: ${getVehicleDetailsURL}`);
                var links;
                let parsedResult = JSON.parse(result);
                links = parsedResult.data.links;
                console.log(links);
                return links;
            })
                .catch((e) => {
                console.log(`failed getVehicleDetailsByMidID: ${getVehicleDetailsURL}`);
                return JSON.stringify({ service: 'vehicle detail not found', time: 0.01 });
            });
        }
        function getVariantIDByMidID(n) {
            console.log(`mid: ${midID}`);
            var getVariantIDURL = `${baseURL}vehicles/${midID}/repair-times?country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getVariantIDURL)
                .then((result) => {
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
                console.log(parsedResult.data);
                if (service === 'OilChange') {
                    console.log('oil change was selected');
                    oilChangeLaborTime = parsedResult.data.repair_times[0].sub_groups[5].components[0].time_hrs;
                    oilChangeDescription = parsedResult.data.repair_times[0].sub_groups[5].components[0].component_description;
                    let payload = JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime });
                    console.log(payload);
                    return payload;
                }
                return JSON.stringify({ service: 'not found', time: 0.01 });
            })
                .catch((e) => {
                console.log(`failed getRepairTimesByVariantAndMid: ${getRepairTimesURL}`);
                return JSON.stringify({ service: 'labortime not found', time: 0.01 });
            });
        }
        function getLubricantsAndCapacities(n) {
            console.log(`midid: ${midID}`);
            var getLubricationURL = `${baseURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getLubricationURL)
                .then((result) => {
                console.log(`rp'd url: ${getLubricationURL} with midID: ${midID}`);
                let parsedResult = JSON.parse(result);
                lubricantsAndCapacities = parsedResult.data[0].technical_data_groups;
                let payload = JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime, lubrication: lubricantsAndCapacities });
                console.log(payload);
                return payload;
            })
                .catch((e) => {
                console.log(`failed getLubricantsAndCapacities: ${getLubricationURL}`);
                return JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime, lubrication: lubricantsAndCapacities });
            });
        }
        function delayBuffer(n) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('delay buffer of 300ms');
                    resolve('balls');
                }, 300);
            });
        }
        const fnList = [getModelIDByManufacturerID, delayBuffer, getMidIDByModelID, delayBuffer, getVariantIDByMidID, delayBuffer, getRepairTimesByVariantAndMid];
        const lubeList = [getModelIDByManufacturerID, delayBuffer, getMidIDByModelID, delayBuffer, getVariantIDByMidID, delayBuffer, getRepairTimesByVariantAndMid, delayBuffer, getLubricantsAndCapacities];
        function pSeries(list) {
            var p = Promise.resolve();
            return list.reduce((pacc, fn) => {
                return pacc = pacc.then(fn);
            }, p);
        }
        if (service === 'OilChange') {
            return pSeries(lubeList);
        }
        return pSeries(fnList);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AUTODATAConnector;
//# sourceMappingURL=autodata.js.map