import * as request from 'request'
import * as rp from 'request-promise'
import * as Fuse from 'fuse.js'
const DataLoader = require('dataloader')
const manufacturerCodes =  [{"Aprilia":"APR"},{"Arctic Cat":"ARC"},{"Benelli":"BEN"},{"BMW":"BMM"},{"BSA":"BSA"},{"Buell":"BUE"},{"Cagiva":"CAG"},{"Can-Am":"CAA"},{"Cannondale":"CAN"},{"CZ":"CZ-"},{"Derbi":"DER"},{"Ducati":"DUC"},{"EBR Motorcycles":"EBR"},{"Enfield":"ENF"},{"Eurospeed":"EUR"},{"Gas Gas":"GGS"},{"Harley-Davidson":"HAR"},{"Honda":"HDA"},{"Husqvarna":"HUS"},{"Hyosung":"HYO"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"}]
const baseURL = 'https://api.autodata-group.com/docs/motorcycles/v1/'

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
      return code
    }()
    console.log(manufacturerID)

    function getModelIDByManufacturerID(){
        var getModelURL = `${baseURL}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`
        return rp(getModelURL)
          .then((result) => {
          console.log(`rp'd url: ${getModelURL}`)
          var modelID;
            let parsedResult = JSON.parse(result)
            parsedResult.data.models.filter((triple) => {
              if (triple.model === model) {
                console.log('model found: ' + triple.model)
                modelID = triple.model_id
              }
            })
            return modelID;
          })
          .catch((e) => {
            console.log(e)
            console.log(`failed getModelIdByManufacturer: ${getModelURL}`)
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
          parsedResult.data.filter((submodel) => {
            if(submodel.model_variant === model) { // seems to be failing here because model variants are like '250 (KL 250D)' search approximation here
              console.log('submodel variant found:' + submodel.model_variant)
            }
            midID = 'KAW01359'
          })
          return midID
        })
        .catch((e) => {
          console.log(e)
          console.log(`failed getMidIDByModelId: ${getMidURL}`)
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
        })
    }

    var fnList = [getModelIDByManufacturerID, getMidIDByModelID, getVehicleDetailsByMidID]

    function pSeries(list){
      var p = Promise.resolve()
      return list.reduce((pacc, fn) => {
        return pacc = pacc.then(fn)
      }, p)
    }

    pSeries(fnList)




  }
}

