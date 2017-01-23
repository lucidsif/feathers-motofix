import * as request from 'request'
import * as rp from 'request-promise'
const DataLoader = require('dataloader')

const ebayURL = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=ListingType&itemFilter(0).value=FixedPrice&keywords='
const autoDataURL = 'https://api.autodata-group.com/docs/motorcycles/v1/'


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

  //TODO: filter ebaysearchapi by price
  //TODO: add shipping price and shipping time
  //TODO: handle edge cases like failed searches and 0 listings
  //TODO: build try another part (returning an array of servicepartsobjs from each item in arry?)

  // TODO: normalize search query casing
  // TODO: do rp.all instead of chaining parts
  public fetchPage(resource: string, vehicle: string, service: string, midID: string) {
    console.log(`params sent to fetchPage are vehicle: ${vehicle}, service: ${service}, and mid: ${midID}`);

    // this function will take a vehicle model and part name and encode a URL
    function createURLKeywords(vehicleModel, partName, partSpec){
      var keywords;
      if(partSpec){
        keywords = `${partName} ${partSpec}`
        let URLkeywords = encodeURIComponent(keywords.trim())
        console.log(`URLKeywords are ${URLkeywords}`);
        return URLkeywords;
      } else {
        keywords = `${partName} ${vehicleModel}`
        let URLkeywords = encodeURIComponent(keywords.trim())
        console.log(`URLKeywords are ${URLkeywords}`);
        return URLkeywords;
      }
    }

    function destructureEbayDataAndConstructPart(partsJSON, partName){
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

    function fetchOilChangePartsSeries(list){
      var p = Promise.resolve()
      return list.reduce((pacc, fn) => {
        return pacc = pacc.then(fn)
      }, p)
    }

    function fetchLubricantsAndCapacities(midID: string){
      var getLubricationURL = `${autoDataURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`
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
          //let obj = JSON.stringify({ data: [{oilSpec: "5w-40"}, {filter: "Ninja OEM"}]})
          return { data: [{oilSpec: "10w-30"}, {filter: "Ninja OEM"}]}
        })
    }

    if(service === "OilChange"){
      // initialize servicePartsObj for every service
      var servicePartsObj = { OilFilter: null, EngineOil: null, Washer: null}
      var oilWeight

      let oilFilterURL
      let oilURL
      let washerURL

      function getOilParts(lubricantsAndCapacities) {
        oilWeight = lubricantsAndCapacities.data[0].oilSpec
        console.log(`oil weight extracted: ${oilWeight}`)
        console.log('OilChange parts queries will be fetched')
        oilFilterURL = `${ebayURL}${createURLKeywords(vehicle, 'oil filter', '')}`
        return rp(oilFilterURL)
          .then((data) => {
            console.log(`fetched: ${oilFilterURL}`)
            destructureEbayDataAndConstructPart(data, 'OilFilter')
          })
          .catch((e) => {
            console.log(e)
            console.log(`failed: ${oilFilterURL}`)
          })
          .then(() => {
            oilURL = `${ebayURL}${createURLKeywords(vehicle, 'rotella synthetic oil 1 gallon', oilWeight)}`
            return rp(oilURL)
              .then((data) => {
                console.log(`fetched: ${oilURL}`)
                destructureEbayDataAndConstructPart(data, 'EngineOil')
              })
              .catch((e) => {
                console.log(e)
                console.log(`failed: ${oilURL}`)
              })
            })
          .then(() => {
            washerURL = `${ebayURL}${createURLKeywords(vehicle, 'drain plug washer', null)}`
            return rp(washerURL)
              .then((data) => {
                console.log(`fetched: ${oilURL}`)
                destructureEbayDataAndConstructPart(data, 'Washer')
                const stringifiedObj = JSON.stringify(servicePartsObj)
                return [stringifiedObj];
              })
              .catch((e) => {
                console.log(e)
                console.log(`failed: ${oilURL}`)
              })
          })
      }
      const oilChangeFuncs = [fetchLubricantsAndCapacities, getOilParts]
      return fetchOilChangePartsSeries(oilChangeFuncs)
    }

    else{
      return ["no service recognized"]
    }
  }
}
