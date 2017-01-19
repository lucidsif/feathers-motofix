"use strict";
const request = require("request");
const rp = require("request-promise");
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
            return rp(`${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`)
                .then((result) => {
                console.log(`rp'd url: ${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`);
                var modelID;
                let parsedResult = JSON.parse(result);
                parsedResult.data.models.filter((triple) => {
                    if (triple.model === model) {
                        console.log('model found: ' + triple.model);
                        modelID = triple.model_id;
                    }
                });
                return modelID;
            })
                .catch((e) => {
                console.log(e);
                console.log(`failed getModelIdByManufacturer: ${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`);
            });
        }
        function getMidIDByModelID(modelIDArg) {
            console.log(`modelidarg: ${modelIDArg}`);
            return rp(`${baseURL}vehicles?model_id=${modelIDArg}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`)
                .then((result) => {
                console.log(`rp'd url: ${baseURL}vehicles?model_id=${modelIDArg}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`);
                var midID;
                let parsedResult = JSON.parse(result);
                parsedResult.data.filter((submodel) => {
                    if (submodel.model_variant === model) {
                        console.log('submodel variant found:' + submodel.model_variant);
                    }
                    midID = 'KAW01359';
                });
                return midID;
            })
                .catch((e) => {
                console.log(e);
                console.log(`failed getMidIDByModelId: ${baseURL}vehicles?model_id=${modelIDArg}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`);
            });
        }
        function getVehicleDetailsByMidID(midIDArg) {
            console.log(`midarg: ${midIDArg}`);
            return rp(`${baseURL}vehicles/${midIDArg}?links=yes&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`)
                .then((result) => {
                console.log(`rp'd url: ${baseURL}vehicles/${midIDArg}?links=yes&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`);
                var links;
                let parsedResult = JSON.parse(result);
                links = parsedResult.data.links;
                console.log(links);
                return links;
            })
                .catch((e) => {
                console.log(e);
                console.log(`failed getVehicleDetailsByMidID: ${baseURL}vehicles/${midIDArg}?links&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`);
            });
        }
        var fnList = [getModelIDByManufacturerID, getMidIDByModelID, getVehicleDetailsByMidID];
        function pSeries(list) {
            var p = Promise.resolve();
            return list.reduce((pacc, fn) => {
                return pacc = pacc.then(fn);
            }, p);
        }
        pSeries(fnList);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AUTODATAConnector;
//# sourceMappingURL=autodata.js.map