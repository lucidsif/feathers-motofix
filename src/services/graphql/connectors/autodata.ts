import * as request from 'request'
import * as rp from 'request-promise'
import { searchForModel, searchForMid } from '../script/search-mid'
const RateLimiter = require('limiter').RateLimiter
const Fuse = require('fuse.js');
const DataLoader = require('dataloader')

const manufacturerCodes =  [{"Aprilia":"APR"},{"Arctic Cat":"ARC"},{"Benelli":"BEN"},{"BMW":"BMM"},{"BSA":"BSA"},{"Buell":"BUE"},{"Cagiva":"CAG"},{"Can-Am":"CAA"},{"Cannondale":"CAN"},{"CZ":"CZ-"},{"Derbi":"DER"},{"Ducati":"DUC"},{"EBR Motorcycles":"EBR"},{"Enfield":"ENF"},{"Eurospeed":"EUR"},{"Gas Gas":"GGS"},{"Harley-Davidson":"HAR"},{"Honda":"HDA"},{"Husqvarna":"HUS"},{"Hyosung":"HYO"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"}]
const baseURL = 'https://api.autodata-group.com/docs/motorcycles/v1/'
const limiter = new RateLimiter(0.5, 'second')


// TODO: add a throttler that works!

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
    // If the resource starts with the root url, just return the resource
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
  // Add relevant filtering logic for labor rest api
  // TODO: Add case handling
  public fetchPage(resource: string, year: string, make: string, model: string, service: string) {
    const services = ['Oil Change', 'Smoke or steam is coming out of motorcycle', 'NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];
    console.log(`resource is: ${resource}, service paramater is ${service} for year:${year}, make:${make}, model:${model}`);

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
      return JSON.stringify({ service: 'make does not exist in autodata', time: 0.01})

    }()
    console.log(manufacturerID)

    function getModelIDByManufacturerID(){
        var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`
        return rp(getModelURL)
          .then((result) => {
          console.log(`rp'd url: ${getModelURL}`)
          var modelID;
          let parsedResult = JSON.parse(result)
            modelID = searchForModel(parsedResult, model)
            console.log(`model returned by Fuse in getModelIdByManufacturer: ${modelID}`)
            return modelID
          })
          .catch((e) => {
            console.log(e)
            console.log(`failed getModelIdByManufacturer: ${getModelURL}`)
            return JSON.stringify({ service: 'modelid not found', time: 0.01})
          })
    }
    // this function is not dynamically retrieving the mid, must use fuzzy search
    function getMidIDByModelID(modelIDArg){
      console.log(`modelidarg: ${modelIDArg}`)
      var getMidURL = `${baseURL}vehicles?model_id=${modelIDArg}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getMidURL)
        .then((result) => {
          console.log(`rp'd url: ${getMidURL}`)
          var midID;
          let parsedResult = JSON.parse(result)
          midID = searchForMid(parsedResult, year, model)
          return midID
        })
        .catch((e) => {
          console.log(e)
          console.log(`failed getMidIDByModelId: ${getMidURL}`)
          return JSON.stringify({ service: 'mid not found', time: 0.01})

        })

    }    // this function is not dynamically retrieving the vehicle detail, must use fuzzy search
    function getVehicleDetailsByMidID(midIDArg){
      console.log(`midarg: ${midIDArg}`)
      var getVehicleDetailsURL = `${baseURL}vehicles/${midIDArg}?links=yes&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
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
          console.log(e)
          console.log(`failed getVehicleDetailsByMidID: ${getVehicleDetailsURL}`)
          return JSON.stringify({ service: 'vehicle detail not found', time: 0.01})

        })
    }

    function getVariantIDByMidID(midIDArg){
      console.log(`midarg: ${midIDArg}`)
      var getVariantIDURL = `${baseURL}vehicles/${midIDArg}/repair-times?country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getVariantIDURL)
        .then((result) => {
          console.log(`rp'd url: ${getVariantIDURL} with midID: ${midIDArg}`)
          var variantID;
          let parsedResult = JSON.parse(result)
          variantID = parsedResult.data[0].variant_id
          return {
            midID: midIDArg,
            variantID,
          }
        })
        .catch((e) => {
          console.log(e)
          console.log(`failed getVariantIDByMidID: ${getVariantIDURL}`)
          return JSON.stringify({ service: 'variant not found', time: 0.01})
        })
    }

    function getRepairTimesByVariantAndMid(midAndVariantObjArg){
      var { midID, variantID } = midAndVariantObjArg
      console.log(` arguments received for getRepairTimes are midID: ${midID}, variantID: ${variantID}`)
      var getRepairTimesURL = `${baseURL}vehicles/${midID}/repair-times/${variantID}?parts=no&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`
      return rp(getRepairTimesURL)
        .then((result) => {
          console.log(`rp'd url: ${getRepairTimesURL} with midID: ${midID} and variantID: ${variantID}`)
          let parsedResult = JSON.parse(result)
          console.log(parsedResult.data)
          if(service === 'OilChange'){
            console.log('oil change was selected')
            let oilChangeLaborTime = parsedResult.data.repair_times[0].sub_groups[5].components[0].time_hrs
            let oilChangeDescription = parsedResult.data.repair_times[0].sub_groups[5].components[0].component_description
            let payload = JSON.stringify({ service: oilChangeDescription, time: oilChangeLaborTime})
            console.log(payload)
            return payload
          }
          return JSON.stringify({ service: 'not found', time: 0.01})
        })
        .catch((e) => {
          console.log(e)
          console.log(`failed getRepairTimesByVariantAndMid: ${getRepairTimesURL}`)
          return JSON.stringify({ service: 'labortime not found', time: 0.01})
        })
    }

    var fnList = [getModelIDByManufacturerID, getMidIDByModelID, getVariantIDByMidID, getRepairTimesByVariantAndMid]

    // bug: throttler terminates code before it can be completed
    function pSeries(list){
      var p = Promise.resolve()
      return list.reduce((pacc, fn) => {
        return pacc = pacc.then(fn)
      }, p)
    }
    return pSeries(fnList)


  }
}

