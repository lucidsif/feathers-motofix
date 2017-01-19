import * as request from 'request'
import * as Fuse from 'fuse.js'
const DataLoader = require('dataloader')
const manufacturerCodes =  [{"Aprilia":"APR"},{"Arctic Cat":"ARC"},{"Benelli":"BEN"},{"BMW":"BMM"},{"BSA":"BSA"},{"Buell":"BUE"},{"Cagiva":"CAG"},{"Can-Am":"CAA"},{"Cannondale":"CAN"},{"CZ":"CZ-"},{"Derbi":"DER"},{"Ducati":"DUC"},{"EBR Motorcycles":"EBR"},{"Enfield":"ENF"},{"Eurospeed":"EUR"},{"Gas Gas":"GGS"},{"Harley-Davidson":"HAR"},{"Honda":"HDA"},{"Husqvarna":"HUS"},{"Hyosung":"HYO"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"},{"Indian":"IND"},{"Italjet":"ITA"},{"Jawa":"JAW"},{"Kawasaki":"KAW"},{"Keeway":"KEE"},{"KTM":"KTM"},{"Kymco":"KYM"},{"Laverda":"LAV"},{"Morini":"MOR"},{"Moto Guzzi":"MOT"},{"MV Agusta":"MVA"},{"MZ/MUZ":"MZ-"},{"Piaggio":"PIA"},{"Polaris":"POL"},{"Suzuki":"SZK"},{"SYM":"SYM"},{"TGB":"TGB"},{"Triumph":"TRI"},{"Ural":"URA"},{"Victory":"VIC"}]

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
// HIT API LIMIT
    // for now - add search engine
      //i. resolve a labortime for oilchange first
      //ii. refactor into a function
      //iii. add conditions for services

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

    return new Promise((resolve, reject) => {
          var modelid
          var mid
          var yearRange
          var links
          // get model ids by manufacturer id
        this.fetch(`${resource}manufacturers/${manufacturerID}?country-code=us&api_key=z66tkk6dh45n5a8mq4hvga6j`)
          .then((result) => {
            if(!this.isJsonString(result)){
              resolve(JSON.stringify({service: 'oil change', time: 0}))
              throw new Error('auto data api not returning valid json')
            }
            let parsedResult = JSON.parse(result)
            parsedResult.data.models.filter((triple) => {
              if (triple.model === model) {
                  console.log('model found: ' + triple.model)
                  modelid = triple.model_id
                }
              })
          })
          .then(() => {
            console.log(modelid)// get mids by modelid
            this.fetch(`${resource}vehicles?model_id=${modelid}&country-code=us&page=1&limit=90&api_key=z66tkk6dh45n5a8mq4hvga6j`)
            .then((result) => {
              if(!this.isJsonString(result)){
                resolve(JSON.stringify({service: 'oil change', time: 0}))
                throw new Error('auto data api not returning valid json')
              }
            let parsedResult = JSON.parse(result)
              parsedResult.data.filter((submodel) => {
              if(submodel.model_variant === model) { // seems to be failing here because model variants are like '250 (KL 250D)' search approximation here
                console.log('submodel variant found:' + submodel.model_variant)
              }
                mid = 'KAW01359'
              })
            })
              .then(() => { // get vehicle details by mid
                this.fetch(`${resource}vehicles/${mid}?links=yes&country-code=us&api_key=z66tkk6dh45n5a8mq4hvga6j`)
                  .then((result) => {
                    if(!this.isJsonString(result)){
                      resolve(JSON.stringify({service: 'oil change', time: 0}))
                      throw new Error('auto data api not returning valid json')
                    }
                  let parsedResult = JSON.parse(result)
                    yearRange = { startYear: parsedResult.data.start_year, endYear: parsedResult.data.end_year }
                    console.log('yearRange below: ')
                    console.log(yearRange)
                    links = parsedResult.data.links
                  })
                  .catch((err) => {
                  console.log(err)
                  })
              })
        })
          .catch((err) => {
            console.log(err)
          })
        })
    // where ddoes catch go?
  }

}

