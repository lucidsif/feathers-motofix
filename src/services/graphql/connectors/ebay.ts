import * as request from 'request'
const DataLoader = require('dataloader')

export default class SWAPIConnector {
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

  //TODO handle edge cases like failed searches and 0 listings
  // TODO: normalize search query casing
  // TODO: refactor so promise concurrently resolves a list of fetch promises. Probably use request.get instead of this.fetch
  public fetchPage(resource: string, vehicle: string, service: string, midID: string) {
    console.log(`params sent to fetchPage are vehicle: ${vehicle}, service: ${service}, and mid: ${midID}`);

    // this function will take a vehicle model and part name and encode a URL
    function createURLKeywords(vehicleModel: string, partName: string){
      let keywords = `${vehicleModel} ${partName}`
      let URLkeywords = encodeURIComponent(keywords.trim())
      console.log(`URLKeywords are ${URLkeywords}`);
      return URLkeywords;
    }

    function destructureAndConstructPart(partsJSON, partName){
      let partsObj = JSON.parse(partsJSON)

      let searchStatus = partsObj.findItemsByKeywordsResponse[0].ack[0]
      //let partListing = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0]
      let partTitle = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0]
      let imageURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0] || null
      let ebayURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0]
      let shippingCost = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost[0]
      let price = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0]
      let condition = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].condition[1]

      servicePartsObj[partName] = { searchStatus, partTitle, imageURL, ebayURL, shippingCost, price, condition }

    }

    if(service === "OilChange"){

      // initialize servicePartsObj for every service
      var servicePartsObj = { OilFilter: null, EngineOil: null};
      console.log('OilChange parts queries will be fetched')

      return new Promise<any>((resolve, reject) => {
        this.fetch(`${resource}${createURLKeywords(vehicle, 'oil filter')}`).then((data) => {
          destructureAndConstructPart(data, 'OilFilter')

        })
          .then((nextService) => {
          this.fetch(`${resource}${createURLKeywords('', 'synthetic motorcycle oil 1L')}`).then((data) => {
            destructureAndConstructPart(data, 'EngineOil')
            const stringifiedObj = JSON.stringify(servicePartsObj)

            resolve([stringifiedObj]);
          })
        })
          .catch((e) => {
          console.log(e)
          })
      })
    }

    else{
      return ["no service recognized"]
    }
  }
}
