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
    fetchPage(resource, year, make, model, service) {
        const services = ['Oil Change', 'Smoke or steam is coming out of motorcycle', 'NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];
        console.log(`resource is: ${resource}, service paramater is ${service} for year:${year}, make:${make}, model:${model}`);
        var manufacturerID = function () {
            var code;
            manufacturerCodes.filter((tuple) => {
                for (var manufacturerName in tuple) {
                    if (manufacturerName === make) {
                        code = tuple[manufacturerName];
                    }
                }
            });
            return code;
        }();
        console.log(manufacturerID);
        function getModelIDByManufacturerID() {
            var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getModelURL)
                .then((result) => {
                console.log(`rp'd url: ${getModelURL}`);
                var modelID;
                let parsedResult = JSON.parse(result);
                let modelArr = parsedResult.data.models;
                let options = {
                    keys: ['model'],
                };
                let FuseModels = new Fuse(modelArr, options);
                let fuseModelsResult = FuseModels.search(model);
                modelID = fuseModelsResult[0];
                console.log(`model returned by Fuse in getModelIdByManufacturer: ${modelID.model}`);
                return modelID.model_id;
            })
                .catch((e) => {
                console.log(e);
                console.log(`failed getModelIdByManufacturer: ${getModelURL}`);
            });
        }
        function getMidIDByModelID(modelIDArg) {
            console.log(`modelidarg: ${modelIDArg}`);
            var getMidURL = `${baseURL}vehicles?model_id=${modelIDArg}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getMidURL)
                .then((result) => {
                console.log(`rp'd url: ${getMidURL}`);
                var midID;
                let parsedResult = JSON.parse(result);
                midID = search_mid_1.searchForMid(parsedResult, year, model);
                return midID;
            })
                .catch((e) => {
                console.log(e);
                console.log(`failed getMidIDByModelId: ${getMidURL}`);
            });
        }
        function getVehicleDetailsByMidID(midIDArg) {
            console.log(`midarg: ${midIDArg}`);
            var getVehicleDetailsURL = `${baseURL}vehicles/${midIDArg}?links=yes&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
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
                console.log(e);
                console.log(`failed getVehicleDetailsByMidID: ${getVehicleDetailsURL}`);
            });
        }
        function getVariantIDByMidID(midIDArg) {
            console.log(`midarg: ${midIDArg}`);
            var getVariantIDURL = `${baseURL}vehicles/${midIDArg}/repair-times?country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getVariantIDURL)
                .then((result) => {
                console.log(`rp'd url: ${getVariantIDURL} with midID: ${midIDArg}`);
                var variantID;
                let parsedResult = JSON.parse(result);
                variantID = parsedResult.data[0].variant_id;
                return {
                    midID: midIDArg,
                    variantID,
                };
            })
                .catch((e) => {
                console.log(e);
                console.log(`failed getVariantIDByMidID: ${getVariantIDURL}`);
            });
        }
        function getRepairTimesByVariantAndMid(midAndVariantObjArg) {
            var { midID, variantID } = midAndVariantObjArg;
            console.log(` arguments received for getRepairTimes are midID: ${midID}, variantID: ${variantID}`);
            var getRepairTimesURL = `${baseURL}vehicles/${midID}/repair-times/${variantID}?parts=no&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`;
            return rp(getRepairTimesURL)
                .then((result) => {
                console.log(`rp'd url: ${getRepairTimesURL} with midID: ${midID} and variantID: ${variantID}`);
                let parsedResult = JSON.parse(result);
                var oilChangeLaborTime = parsedResult.data.repair_times[0].sub_groups[5].components[0].time_hrs;
                var oilChangeDescription = parsedResult.data.repair_times[0].sub_groups[5].components[0].time_hrs;
                var payload = JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime });
                return payload;
            })
                .catch((e) => {
                console.log(e);
                console.log(`failed getRepairTimesByVariantAndMid: ${getRepairTimesURL}`);
            });
        }
        var fnList = [getModelIDByManufacturerID, getMidIDByModelID, getVariantIDByMidID, getRepairTimesByVariantAndMid];
        function pSeries(list) {
            var p = Promise.resolve();
            return list.reduce((pacc, fn) => {
                return pacc = pacc.then(fn);
            }, p);
        }
        return pSeries(fnList);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AUTODATAConnector;
//# sourceMappingURL=autodata.js.map