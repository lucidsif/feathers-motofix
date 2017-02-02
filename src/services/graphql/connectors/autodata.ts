import * as request from 'request'
import * as rp from 'request-promise'
import { searchForModel, searchForMid } from '../script/search-mid'
const Fuse = require('fuse.js');
const DataLoader = require('dataloader')

const manufacturerCodes =  [{"Aprilia":"APR"},{"Arctic Cat":"ARC"},{"Benelli":"BEN"},{"BMW":"BMM"},{"BSA":"BSA"},{"Buell":"BUE"},{"Cagiva":"CAG"},{"Can-Am":"CAA"},{"Cannondale":"CAN"},{"CZ":"CZ-"},{"Derbi":"DER"},{"Ducati":"DUC"},{"EBR Motorcycles":"EBR"},{"Enfield":"ENF"},{"Eurospeed":"EUR"},{"Gas Gas":"GGS"},{"Harley-Davidson":"HAR"},{"Honda":"HDA"},{"Husqvarna":"HUS"},{"Hyosung":"HYO"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"}]
const baseURL = 'https://api.autodata-group.com/docs/motorcycles/v1/'

// TODO: Test allRepairTimes
// TODO: 5/10 find a proper way to throttle sequential promises

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

  public isJsonString(str){
    try{
      JSON.parse(str)
    } catch(e) {
      console.log('not valid json')
      return false;
    }
    return true
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
    console.log(manufacturerID)

    function getModels(){
      var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getModelURL)
        .then((result) => {
          console.log(`rp'd url: ${getModelURL}`)
          let parsedResult = JSON.parse(result)
          return parsedResult.data.models
        })
        .catch((e) => {
          console.log(`failed getModelIdByManufacturer: ${getModelURL}`)
          return JSON.stringify({ service: 'model array not found', time: 0.01})
        })
    }
    return getModels()
  }

  public fetchSubModels(resource: string, modelID: number){
    function getSubModels(){
      console.log(`modelid: ${modelID}`)
      var getMidURL = `${baseURL}vehicles?model_id=${modelID}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      console.time('submodel')
      return rp(getMidURL)
        .then((result) => {
          console.log(`rp'd url: ${getMidURL}`)
          let parsedResult = JSON.parse(result)
          console.timeEnd('submodel')
          return parsedResult.data
        })
        .catch((e) => {
          console.log(`failed getMidIDByModelId: ${getMidURL}`)
          return JSON.stringify({ service: 'mid not found', time: 0.01})
        })
    }

    return getSubModels()
  }

  // it should return the entire repairtimes array
  public fetchRepairTimes(resource: string, midID: string){
    console.log(`midID: ${midID}`)
    var variantID;

    function getVariantIDByMidID(){
      console.log(`mid: ${midID}`)
      var getVariantIDURL = `${baseURL}vehicles/${midID}/repair-times?country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getVariantIDURL)
        .then((result) => {
        console.log(result)
          console.log(`rp'd url: ${getVariantIDURL} with midID: ${midID}`)
          let parsedResult = JSON.parse(result)
          variantID = parsedResult.data[0].variant_id
          return {
            midID,
            variantID,
          }
        })
        .catch((e) => {

          console.log(`failed getVariantIDByMidID: ${getVariantIDURL}`)
          return JSON.stringify({ service: 'variant not found', time: 0.01})
        })
    }

    function getRepairTimesByVariantAndMid(n){
      console.log(` arguments received for getRepairTimes are midID: ${midID}, variantID: ${variantID}`)
      var getRepairTimesURL = `${baseURL}vehicles/${midID}/repair-times/${variantID}?parts=no&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getRepairTimesURL)
        .then((result) => {
          console.log(`rp'd url: ${getRepairTimesURL} with midID: ${midID} and variantID: ${variantID}`)
          let parsedResult = JSON.parse(result)
          let repairTimesObj = parsedResult.data.repair_times
          return JSON.stringify(repairTimesObj)
        })
        .catch((e) => {
          console.log(e);
          console.log(`failed getRepairTimesByVariantAndMid: ${getRepairTimesURL}`)
          //return JSON.stringify({ service: 'labortime not found', time: 0.01})
          return JSON.stringify({ data: [{laborTime: 0.0}, {laborTime: 0.0}], unavailable: true})
        })
    }

    function delayBuffer(n){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('delay buffer of 250ms')
          resolve('balls')
        }, 250)
      })
    }

    function pSeries(list){
      var p = Promise.resolve()
      return list.reduce((pacc, fn) => {
        return pacc = pacc.then(fn)
      }, p)
    }

    const fnList = [getVariantIDByMidID, delayBuffer, getRepairTimesByVariantAndMid]
    return pSeries(fnList)

  }

  public fetchLubricantsAndCapacities(resource: string, midID: string){
    console.log(`midid: ${midID}`)
    var getLubricationURL = `${baseURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`
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



  // Add relevant filtering logic for labor rest api
  // TODO: Add case handling
  /*
  public fetchPage(resource: string, year: string, make: string, model: string, service: string) {
    const services = ['Oil Change', 'Smoke or steam is coming out of motorcycle', 'NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];
    console.log(`resource is: ${resource}, service paramater is ${service} for year:${year}, make:${make}, model:${model}`);

    var modelID;
    var midID;
    var variantID;
    var lubricantsAndCapacities;
    var oilChangeLaborTime;
    var oilChangeDescription;

      //i. write wrapper functions that returns a promise
      //ii. write a reducer function that serially chains the promises
      //iii. add search to each function
    // iv. add try/catch handling

    var manufacturerID = function() {
      var code// get manufacturer codes by manufacturer name
      manufacturerCodes.filter((tuple) => {
        for (var manufacturerName in tuple) {
          if (manufacturerName === make) {
            code = tuple[manufacturerName]
          }
        }
      })
      if(code){
        return code
      }
      return JSON.stringify({ service: 'make does not exist in autodata', time: 0.01})
    }()
    console.log(manufacturerID)

    function getModelIDByManufacturerID(){
        var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`
        return rp(getModelURL)
          .then((result) => {
          console.log(`rp'd url: ${getModelURL}`)
          let parsedResult = JSON.parse(result)
            modelID = searchForModel(parsedResult, model)
            console.log(`model returned by Fuse in getModelIdByManufacturer: ${modelID}`)
            return modelID
          })
          .catch((e) => {

            console.log(`failed getModelIdByManufacturer: ${getModelURL}`)
            return JSON.stringify({ service: 'modelid not found', time: 0.01})
          })
    }
    // this function is not dynamically retrieving the mid, must use fuzzy search
    function getMidIDByModelID(n){
      console.log(`modelid: ${modelID}`)
      var getMidURL = `${baseURL}vehicles?model_id=${modelID}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getMidURL)
        .then((result) => {
          console.log(`rp'd url: ${getMidURL}`)
          let parsedResult = JSON.parse(result)
          midID = searchForMid(parsedResult, year, model)
          return midID
        })
        .catch((e) => {

          console.log(`failed getMidIDByModelId: ${getMidURL}`)
          return JSON.stringify({ service: 'mid not found', time: 0.01})

        })

    }    // this function is not dynamically retrieving the vehicle detail, must use fuzzy search
    function getVehicleDetailsByMidID(n){
      console.log(`midid: ${midID}`)
      var getVehicleDetailsURL = `${baseURL}vehicles/${midID}?links=yes&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getVehicleDetailsURL)
        .then((result) => {
          console.log(`rp'd url: ${getVehicleDetailsURL}`)
          var links;
          let parsedResult = JSON.parse(result)
          links = parsedResult.data.links
          console.log(links)
          return links
        })
        .catch((e) => {

          console.log(`failed getVehicleDetailsByMidID: ${getVehicleDetailsURL}`)
          return JSON.stringify({ service: 'vehicle detail not found', time: 0.01})

        })
    }

    function getVariantIDByMidID(n){
      console.log(`mid: ${midID}`)
      var getVariantIDURL = `${baseURL}vehicles/${midID}/repair-times?country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getVariantIDURL)
        .then((result) => {
          console.log(`rp'd url: ${getVariantIDURL} with midID: ${midID}`)
          let parsedResult = JSON.parse(result)
          variantID = parsedResult.data[0].variant_id
          return {
            midID,
            variantID,
          }
        })
        .catch((e) => {

          console.log(`failed getVariantIDByMidID: ${getVariantIDURL}`)
          return JSON.stringify({ service: 'variant not found', time: 0.01})
        })
    }

    function getRepairTimesByVariantAndMid(n){
      console.log(` arguments received for getRepairTimes are midID: ${midID}, variantID: ${variantID}`)
      var getRepairTimesURL = `${baseURL}vehicles/${midID}/repair-times/${variantID}?parts=no&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getRepairTimesURL)
        .then((result) => {
          console.log(`rp'd url: ${getRepairTimesURL} with midID: ${midID} and variantID: ${variantID}`)
          let parsedResult = JSON.parse(result)
          console.log(parsedResult.data)
          if(service === 'OilChange'){
            console.log('oil change was selected')
            oilChangeLaborTime = parsedResult.data.repair_times[0].sub_groups[5].components[0].time_hrs
            oilChangeDescription = parsedResult.data.repair_times[0].sub_groups[5].components[0].component_description
            let payload = JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime})
            console.log(payload)
            return payload
          }
          return JSON.stringify({ service: 'not found', time: 0.01})
        })
        .catch((e) => {

          console.log(`failed getRepairTimesByVariantAndMid: ${getRepairTimesURL}`)
          return JSON.stringify({ service: 'labortime not found', time: 0.01})
        })
    }

    // TODO: determine how this wrapper function should be called
    function getLubricantsAndCapacities(n){
      console.log(`midid: ${midID}`)
      var getLubricationURL = `${baseURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getLubricationURL)
        .then((result) => {
          console.log(`rp'd url: ${getLubricationURL} with midID: ${midID}`)
          let parsedResult = JSON.parse(result)
          lubricantsAndCapacities = parsedResult.data[0].technical_data_groups
          let payload = JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime, lubrication: lubricantsAndCapacities})
          console.log(payload)
          return payload
        })
        .catch((e) => {
          console.log(`failed getLubricantsAndCapacities: ${getLubricationURL}`)
          return JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime, lubrication: lubricantsAndCapacities})
        })
    }

    function delayBuffer(n){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('delay buffer of 300ms')
          resolve('balls')
        }, 300)
      })
    }

    const fnList = [getModelIDByManufacturerID, delayBuffer, getMidIDByModelID, delayBuffer, getVariantIDByMidID, delayBuffer, getRepairTimesByVariantAndMid]
    const lubeList = [getModelIDByManufacturerID, delayBuffer, getMidIDByModelID, delayBuffer, getVariantIDByMidID, delayBuffer, getRepairTimesByVariantAndMid, delayBuffer, getLubricantsAndCapacities]

    function pSeries(list){
      var p = Promise.resolve()
      return list.reduce((pacc, fn) => {
        return pacc = pacc.then(fn)
      }, p)
    }

    if(service === 'OilChange'){
      return pSeries(lubeList)
    }
    return pSeries(fnList)


  }
  */
}

//ebay
//http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=%20synthetic%20oil%2010W-30%201%20quart&buyerPostalCode=11435&itemFilter(0).name=ListingType&itemFilter(0).value=FixedPrice&itemFilter(1).name=MaxPrice&itemFilter(1).value=35&itemFilter(2).name=MaxDistance&itemFilter(2).value=3200

//autodata
//https://api.autodata-group.com/docs/motorcycles/v1/vehicles/HDA06327/repair-times?&api_key=wjvfv42uwdvq74qxqwz9sfdacountry-code=us&page=1&limit=90



