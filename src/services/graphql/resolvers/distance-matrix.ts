/**
 * Created by Sif on 2/4/17.
 */
const destination_addresses = (distanceMatrix) => distanceMatrix.destination_addresses
const origin_addresses = (distanceMatrix) => distanceMatrix.origin_addresses
const rows = (distanceMatrix) => distanceMatrix.rows
const status = (distanceMatrix) => distanceMatrix.status

export default {
  DistanceMatrix: {
    destination_addresses,
    origin_addresses,
    rows,
    status
  }
}
