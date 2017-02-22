"use strict";
const mid = (subModel) => subModel.mid;
const manufacturer = (subModel) => subModel.manufacturer;
const model = (subModel) => subModel.model;
const model_variant = (subModel) => subModel.model_variant;
const tuning_description = (subModel) => subModel.tuning_description;
const start_year = (subModel) => subModel.start_year;
const end_year = (subModel) => subModel.end_year;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SubModel: {
        mid,
        manufacturer,
        model,
        model_variant,
        tuning_description,
        start_year,
        end_year
    },
};
//# sourceMappingURL=sub-model.js.map