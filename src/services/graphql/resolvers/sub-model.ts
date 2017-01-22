const mid =  (subModel) => subModel.mid
const model = (subModel) => subModel.model
const model_variant = (subModel) => subModel.model_variant
const start_year = (subModel) => subModel.start_year
const end_year = (subModel) => subModel.end_year

export default {
  SubModel: {
    mid,
    model,
    model_variant,
    start_year,
    end_year
  },
}
