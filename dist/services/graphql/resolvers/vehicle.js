"use strict";
const id = (vehicle) => vehicle.id;
const year = (vehicle) => vehicle.year;
const make = (vehicle) => vehicle.make;
const model = (vehicle) => vehicle.model;
const submodel = (vehicle) => vehicle.submodel;
const detail = (vehicle) => vehicle.detail;
const vehicletype = (vehicle) => vehicle.vehicletype;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Vehicle: {
        id,
        year,
        make,
        model,
        submodel,
        detail,
        vehicletype,
    }
};
//# sourceMappingURL=vehicle.js.map