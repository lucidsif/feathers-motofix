import * as request from 'request'
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

    let manufacturerID = function getManufacturerCode() {
      var code;
      manufacturerCodes.filter((tuple) => {
        for (var manufacturerName in tuple) {
          if (manufacturerName === make) {
            code = tuple[manufacturerName]
          }
        }
      })
      return code
    }
    console.log(manufacturerID())




      return new Promise<any>((resolve, reject) => {

        this.fetch(`${resource}`).then((data) => {
          if(service === 'OilChange'){
            resolve(JSON.stringify({service: 'oil change', time: 1}))
          }
          if(service === 'Winterization'){
            resolve(JSON.stringify({service: 'winterization', time: 3.5}))
          }
          resolve(data);
            })
          })
  }
}

