import * as request from 'request'
import * as rp from 'request-promise'
const DataLoader = require('dataloader')
const promiseRetry = require('promise-retry');

const manufacturerCodes =  [{"Aprilia":"APR"},{"Arctic Cat":"ARC"},{"Benelli":"BEN"},{"BMW":"BMM"},{"BSA":"BSA"},{"Buell":"BUE"},{"Cagiva":"CAG"},{"Can-Am":"CAA"},{"Cannondale":"CAN"},{"CZ":"CZ-"},{"Derbi":"DER"},{"Ducati":"DUC"},{"EBR Motorcycles":"EBR"},{"Enfield":"ENF"},{"Eurospeed":"EUR"},{"Gas Gas":"GGS"},{"Harley-Davidson":"HAR"},{"Honda":"HDA"},{"Husqvarna":"HUS"},{"Hyosung":"HYO"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"}]
const baseURL = 'https://api.autodata-group.com/docs/motorcycles/v1/';
const API_KEY = 'z66tkk6dh45n5a8mq4hvga6j';

export default class AUTODATAConnector {
  public loader
  private rootURL: string

  constructor(rootURL: string) {
    this.rootURL = rootURL
    this.loader = new DataLoader((urls) => {
      const promises = urls.map((url) => {
        return this.fetch(url)
      })
      return Promise.all(promises)
    }, {batch: false})
  }

  public fetch(resource: string) {
    // If the resource starts with the root url, just return the resnpm run sfsajource
    // Otherwise, return an appended root url + resource
    const url = resource.indexOf(this.rootURL) === 0 ? resource : this.rootURL + resource

    return new Promise<any>((resolve, reject) => {
      console.log(`fetch: ${url}`)
      request.get(url, (err, resp, body) => {
        console.log(`fetch: ${url} completed`)
        err ? reject(err) : resolve(body)
      })
    })
  }

  public fetchModels(resource: string, manufacturer: string){

    var manufacturerID = function() {
      var code// get manufacturer codes by manufacturer name
      manufacturerCodes.filter((tuple) => {
        for (var manufacturerName in tuple) {
          if (tuple[manufacturerName] === manufacturer) {
            code = tuple[manufacturerName]
          }
        }
      })
      if(code){
        return code
      }
      return JSON.stringify({ service: `${manufacturer} does not exist in autodata', time: 0.01` })
    }()

    function getModels(retry, number){
      var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=${API_KEY}`
      return rp(getModelURL)
        .then((result) => {
          console.log(`rp'd url: ${getModelURL}`)
          let parsedResult = JSON.parse(result)
          return parsedResult.data.models
        })
        .catch( function(err) {
          console.log(`failed getModelIdByManufacturer: ${getModelURL}`);
          console.log(err.statusCode);
          if (err.statusCode === 403 && number <= 3) {
            // if developer over qps, retry
            return retry(err);
          }
          return JSON.stringify({ service: 'model array not found', time: 0.01})
        })
    }
    return promiseRetry(getModels, { retries: 3, minTimeout: 500 })

  }

  public fetchSubModels(resource: string, modelID: number){
    function getSubModels(retry, number){
      console.log('attempt number: ' + number)
      console.log(`modelid: ${modelID}`)
      var getMidURL = `${baseURL}vehicles?model_id=${modelID}&country-code=us&page=1&limit=90&api_key=${API_KEY}`
      console.time('submodel')
      return rp(getMidURL)
        .then((result) => {
          console.log(`rp'd url: ${getMidURL}`)
          let parsedResult = JSON.parse(result)
          console.timeEnd('submodel')
          return parsedResult.data
        })
        .catch( function(err) {
          console.log(`failed getMidIDByModelId: ${getMidURL}`)
          console.log(err.statusCode);
          if (err.statusCode === 403 && number <= 3) {
            // if developer over qps, retry
            return retry(err);
          }
          return JSON.stringify({ service: 'mid not found', time: 0.01})
        })
    }

    return promiseRetry(getSubModels, { retries: 3, minTimeout: 500 })
  }

  // it should return the entire repairtimes array
  // TODO: retry only the second request if that is the only one that fails
  public fetchRepairTimes(resource: string, midID: string){

    function getVariantIDByMidIDAndGetRepairTimes(retry, number){
      var variantID;
      var getVariantIDURL = `${baseURL}vehicles/${midID}/repair-times?country-code=us&page=1&limit=90&api_key=${API_KEY}`;
      var getRepairTimesURL;
      console.log('attempt number: ' + number)
      console.log(`mid: ${midID}`)

      return rp(getVariantIDURL)
        .then((result) => {
          console.log(result)
          console.log(`rp'd url: ${getVariantIDURL} with midID: ${midID}`)
          let parsedResult = JSON.parse(result)
          variantID = parsedResult.data[0].variant_id
          return { // return mid and variant id
            midID,
            variantID,
          }
        })
        .then((response) => {
        console.log(response)
          getRepairTimesURL = `${baseURL}vehicles/${midID}/repair-times/${variantID}?parts=no&country-code=us&page=1&limit=90&api_key=${API_KEY}`
          return rp(getRepairTimesURL)
        })
        .then((repairTimes) => {
          console.log(`rp'd url: ${getRepairTimesURL} with midID: ${midID} and variantID: ${variantID}`)
          console.log(repairTimes);
          let parsedResult = JSON.parse(repairTimes)
          let repairTimesObj = parsedResult.data.repair_times
          return JSON.stringify(repairTimesObj)
        })
        .catch(function (err) {
          console.log(`failed`)
          console.log(getVariantIDURL)
          console.log(getRepairTimesURL)
          console.log(err.statusCode);
          if(err.statusCode === 403 && number <= 5) {
            // if developer over qps, retry
            return retry(err);
          }
          return JSON.stringify({ data: [{laborTime: 0.0}, {laborTime: 0.0}], unavailable: 'limited'})
        })
    }
    return promiseRetry(getVariantIDByMidIDAndGetRepairTimes, { retries: 3, minTimeout: 500});
  }

  public fetchLubricantsAndCapacities(resource: string, midID: string){
    console.log(`midid: ${midID}`)
    var getLubricationURL = `${baseURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=${API_KEY}`
    return rp(getLubricationURL)
      .then((result) => {
        console.log(`rp'd url: ${getLubricationURL} with midID: ${midID}`)
        let parsedResult = JSON.parse(result)
        let lubricantsAndCapacities = parsedResult.data[0].technical_data_groups
        //let payload = JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime, lubrication: lubricantsAndCapacities})
        return lubricantsAndCapacities
      })
      .catch((e) => {
        //console.log(`failed getLubricantsAndCapacities: ${getLubricationURL}`)
        console.log('failed, so mock data')
        // mock
        // return an object that returns false so that when parsed, the client will know to render a cannot find labor estimate, but can give you an estimate.
        // just do a cannot find quote for now and later on, allow user to get an email when it is available
        let obj = JSON.stringify({ data: [{oilSpec: "5w-40"}, {filter: "Ninja OEM"}]})
        console.log(obj)
        return obj;
      })
  }
}
