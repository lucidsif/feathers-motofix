import * as request from 'request'
import * as rp from 'request-promise'
const DataLoader = require('dataloader')

const ebayURL = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TawsifAh-motoebay-PRD-545f64428-d1251e34&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords='
const buyerPostalCode= '&buyerPostalCode=11435'
const buyItNowFilter = `&itemFilter(0).name=ListingType&itemFilter(0).value=FixedPrice`
const maxPriceFilter = '&itemFilter(1).name=MaxPrice&itemFilter(1).value='
const maxDistanceFilter = '&itemFilter(2).name=MaxDistance&itemFilter(2).value=3200'

const autoDataURL = 'https://api.autodata-group.com/docs/motorcycles/v1/'
const AUTODATA_API_KEY = 'z66tkk6dh45n5a8mq4hvga6j';

// Modularize API key


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

// TODO: add concept of quantity
  //TODO: FUTURE build try another part (returning an array of servicepartsobjs from each item in arry?)

  // TODO: normalize search query casing
  // TODO: do rp.all instead of chaining parts
  public fetchPage(resource: string, vehicle: string, service: string, midID: string) {
    console.log(`params sent to fetchPage are vehicle: ${vehicle}, service: ${service}, and mid: ${midID}`);

    // this function will take a vehicle model and part name and encode a URL
    function createURLKeywords(vehicleModel, partName, partSpec){
      var keywords;
      if(partSpec){
        keywords = `&${partName} ${partSpec}`
        let URLkeywords = encodeURIComponent(keywords.trim())
        console.log(`URLKeywords are ${URLkeywords}`);
        return URLkeywords;
      } else {
        keywords = `&${partName} ${vehicleModel}`
        let URLkeywords = encodeURIComponent(keywords.trim())
        console.log(`URLKeywords are ${URLkeywords}`);
        return URLkeywords;
      }
    }
// TODO: only construct part if listings > 0
// TODO: create an arr of valid listings to create partsObjects from
    function destructureEbayDataAndConstructPart(partsJSON, partName){
        let partsObj = JSON.parse(partsJSON)
        let searchResult = partsObj.findItemsByKeywordsResponse[0].searchResult[0]["@count"]
      console.log('searchresults: ' + searchResult)

        if(searchResult > 0) {
          try {
            let valid = true
            let partTitle = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0]
            let imageURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0]
            let ebayURL = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0]
            let shippingCost = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].shippingInfo
            let price = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0]
            let condition = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item[0].condition[1]
            let quantity = 1
            servicePartsObj[partName] = {valid, partTitle, imageURL, ebayURL, shippingCost, price, condition, quantity}
            console.log(servicePartsObj[partName])
          } catch(e){
            console.log('json extracting problem during part construction')
            console.log(e)
            servicePartsObj[partName] = {valid: false}
          }
        } else {
          servicePartsObj[partName] = {valid: false}
          console.log(servicePartsObj)
        }
        //let partListings = partsObj.findItemsByKeywordsResponse[0].searchResult[0].item
        // filter for items that have the following properties

        //console.log(partListings)
        /*
        let filteredListings = partListings.filter((listing) => {
          return listing.title[0] && listing.galleryURL[0] && listing.viewItemURL[0] && listing.shippingInfo && listing.sellingStatus[0].currentPrice[0] && listing.condition[1]
        })
        */
    }

    function fetchOilChangePartsSeries(list){
      var p = Promise.resolve()
      return list.reduce((pacc, fn) => {
        return pacc = pacc.then(fn)
      }, p)
    }

    function fetchLubricantsAndCapacities(){
      var getLubricationURL = `${autoDataURL}vehicles/${midID}/technical-data?group=lubricants_and_capacities&country-code=us&api_key=${AUTODATA_API_KEY}`
      return rp(getLubricationURL)
        .then((result) => {
          console.log(`rp'd url: ${getLubricationURL} with midID: ${midID}`)
          let parsedResult = JSON.parse(result)
          let lubricantsAndCapacities = parsedResult.data[0].technical_data_groups
          return lubricantsAndCapacities
        })
        .catch((e) => {
          console.log(`failed lubesandcapacities url: ${getLubricationURL} with midID: ${midID}`)
          console.log(e.statusCode)
          //throw new Error(e)
          // mock
          return { data: [{oilSpec: "10w-30"}, {filter: "Ninja OEM"}]}
        })
    }
// TODO: Add concept of quantity
    if(service === "OilChange"){
      // washer property removed for now
      var servicePartsObj = { OilFilter: {valid: false}, EngineOil: {valid: false} }
      var oilWeight
      var oilVolume
      var oilQuantity

      let oilFilterURL
      let oilURL
      //let washerURL
// TODO: add error handling
      function getOilParts(lubricantsAndCapacities) {
        console.log(lubricantsAndCapacities)
        if(!lubricantsAndCapacities.length){
          console.log('err conditional met')
          let stringifiedObj = JSON.stringify(servicePartsObj)
          return [stringifiedObj];
        }
        const lubricantsAndCapacitiesGroup = lubricantsAndCapacities[0].group_items
        let oilWeightGroup = lubricantsAndCapacitiesGroup.filter((group) => {
          return group.description === 'Engine oil grade'
        })
        let oilVolumeGroup = lubricantsAndCapacitiesGroup.filter((group) => {
          return group.description === 'Engine oil with filter'
        })
        oilWeight = oilWeightGroup[0].other
        oilVolume = 1
        oilQuantity = oilVolumeGroup[0].value
        // add oil quantity in some form
        console.log(`oil weight extracted: ${oilWeight}`)
        console.log(`oil volume extracted: ${oilVolume}`)
        console.log(`oil quantity in units of oil volume: ${oilQuantity}`)
        let oilFilterMaxPriceValue = 20
        oilFilterURL = `${ebayURL}${createURLKeywords(vehicle, 'oil filter', '')}${buyerPostalCode}${buyItNowFilter}${maxPriceFilter}${oilFilterMaxPriceValue}${maxDistanceFilter}`
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
          let oilMaxPriceValue = 10
            oilURL = `${ebayURL}${createURLKeywords(vehicle, 'synthetic oil', `${oilWeight} ${oilVolume} quart`)}${buyerPostalCode}${buyItNowFilter}${maxPriceFilter}${oilMaxPriceValue}${maxDistanceFilter}`
            return rp(oilURL)
              .then((data) => {
                console.log(`fetched: ${oilURL}`)
                destructureEbayDataAndConstructPart(data, 'EngineOil')
                servicePartsObj.EngineOil['quantity'] = Math.ceil(oilQuantity)
                const stringifiedObj = JSON.stringify(servicePartsObj)
                console.log('rounded oil quantity:' + Math.ceil(oilQuantity))
                return [stringifiedObj];
              })
              .catch((e) => {
                console.log(e)
                console.log(`failed: ${oilURL}`)
              })
            })
          /*
          .then(() => {
          let washerMaxPriceValue = 10
            washerURL = `${ebayURL}${createURLKeywords(vehicle, 'drain plug washer', '')}${buyerPostalCode}${buyItNowFilter}${maxPriceFilter}${washerMaxPriceValue}${maxDistanceFilter}`
            return rp(washerURL)
              .then((data) => {
                console.log(`fetched: ${washerURL}`)
                destructureEbayDataAndConstructPart(data, 'Washer')
                const stringifiedObj = JSON.stringify(servicePartsObj)
                return [stringifiedObj];
              })
              .catch((e) => {
                console.log(e)
                console.log(`failed: ${washerURL}`)
              })
          })
          */
      }
      const oilChangeFuncs = [fetchLubricantsAndCapacities, getOilParts]
      return fetchOilChangePartsSeries(oilChangeFuncs)
    }

    else{
      return ["no service recognized"]
    }
  }
}
