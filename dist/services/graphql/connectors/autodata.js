"use strict";
const request = require("request");
const DataLoader = require('dataloader');
const manufacturerCodes = [{ "Aprilia": "APR" }, { "Arctic Cat": "ARC" }, { "Benelli": "BEN" }, { "BMW": "BMM" }, { "BSA": "BSA" }, { "Buell": "BUE" }, { "Cagiva": "CAG" }, { "Can-Am": "CAA" }, { "Cannondale": "CAN" }, { "CZ": "CZ-" }, { "Derbi": "DER" }, { "Ducati": "DUC" }, { "EBR Motorcycles": "EBR" }, { "Enfield": "ENF" }, { "Eurospeed": "EUR" }, { "Gas Gas": "GGS" }, { "Harley-Davidson": "HAR" }, { "Honda": "HDA" }, { "Husqvarna": "HUS" }, { "Hyosung": "HYO" }, { "Indian": "IND" }, { "Italjet": "ITA" }, { "Jawa": "JAW" }, { "Kawasaki": "KAW" }, { "Keeway": "KEE" }, { "KTM": "KTM" }, { "Kymco": "KYM" }, { "Laverda": "LAV" }, { "Morini": "MOR" }, { "Moto Guzzi": "MOT" }, { "MV Agusta": "MVA" }, { "MZ/MUZ": "MZ-" }, { "Piaggio": "PIA" }, { "Polaris": "POL" }, { "Suzuki": "SZK" }, { "SYM": "SYM" }, { "TGB": "TGB" }, { "Triumph": "TRI" }, { "Ural": "URA" }, { "Victory": "VIC" }, { "Indian": "IND" }, { "Italjet": "ITA" }, { "Jawa": "JAW" }, { "Kawasaki": "KAW" }, { "Keeway": "KEE" }, { "KTM": "KTM" }, { "Kymco": "KYM" }, { "Laverda": "LAV" }, { "Morini": "MOR" }, { "Moto Guzzi": "MOT" }, { "MV Agusta": "MVA" }, { "MZ/MUZ": "MZ-" }, { "Piaggio": "PIA" }, { "Polaris": "POL" }, { "Suzuki": "SZK" }, { "SYM": "SYM" }, { "TGB": "TGB" }, { "Triumph": "TRI" }, { "Ural": "URA" }, { "Victory": "VIC" }];
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
            console.log('not valid json, api prob returning error');
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
        return new Promise((resolve, reject) => {
            var modelid;
            var mid;
            var yearRange;
            var links;
            this.fetch(`${resource}manufacturers/${manufacturerID}?country-code=us&api_key=z66tkk6dh45n5a8mq4hvga6j`)
                .then((result) => {
                if (this.isJsonString(result)) {
                    let parsedResult = JSON.parse(result);
                    parsedResult.data.models.filter((triple) => {
                        if (triple.model === model) {
                            console.log('model found: ' + triple.model);
                            modelid = triple.model_id;
                        }
                    });
                }
                else {
                    console.log('else block hit');
                    resolve(JSON.stringify({ service: 'oil change', time: 0 }));
                }
            })
                .then(() => {
                console.log(modelid);
                this.fetch(`${resource}vehicles?model_id=${modelid}&country-code=us&page=1&limit=90&api_key=z66tkk6dh45n5a8mq4hvga6j`)
                    .then((result) => {
                    let parsedResult = JSON.parse(result);
                    parsedResult.data.filter((submodel) => {
                        if (submodel.model_variant === model) {
                            console.log('submodel variant found:' + submodel.model_variant);
                        }
                        mid = 'KAW01359';
                    });
                })
                    .then(() => {
                    this.fetch(`${resource}vehicles/${mid}?links=yes&country-code=us&api_key=z66tkk6dh45n5a8mq4hvga6j`)
                        .then((result) => {
                        let parsedResult = JSON.parse(result);
                        yearRange = { startYear: parsedResult.data.start_year, endYear: parsedResult.data.end_year };
                        console.log('yearRange below: ');
                        console.log(yearRange);
                        links = parsedResult.data.links;
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                });
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AUTODATAConnector;
//# sourceMappingURL=autodata.js.map