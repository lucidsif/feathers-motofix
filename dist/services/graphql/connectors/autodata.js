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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AUTODATAConnector;
//# sourceMappingURL=autodata.js.map