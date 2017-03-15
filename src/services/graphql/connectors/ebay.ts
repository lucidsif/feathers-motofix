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

// TODO: reorganize code


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

  //TODO: FUTURE build try another part (returning an array of servicepartsobjs from each item in arry?)
  // TODO: do rp.all instead of chaining parts
  // this method will createUrl link based on the vehicle model and part name => start a reducer function that will run an array of functions returning promises
  // => first function will fetch oilSpec data from autodata api => second function will run the getParts function which return an array of parts to send to the client
  public fetchPage(resource: string, vehicle: string, service: string, midID: string) {
    console.log(`params sent to fetchPage are vehicle: ${vehicle}, service: ${service}, and mid: ${midID}`);
    midID = 'balls';
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

    // this function will parse the data returned from the ebay search api, extract the relevant data for the part,
    // and create a custom part object that will be sent to the client
    function destructureEbayDataAndConstructPart(partsJSON, partName){
      console.log(`searching for ${partName}`)
      let partsObj = JSON.parse(partsJSON)
      let searchResult = partsObj.findItemsByKeywordsResponse[0].searchResult[0]["@count"]
      console.log('searchresults: ' + searchResult)
// if no parts were found from the ebay search api, create a default generic part
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
        console.log('search result is 0')
        switch (service) {
          case 'OilChange':
            switch (partName) {
              case 'EngineOil':
                servicePartsObj['EngineOil'].valid = true;
                servicePartsObj['EngineOil'].partTitle = '[] BRAND AND SPEC OF ENGINE OIL WILL BE DETERMINED BY MOTOFIX';
                servicePartsObj['EngineOil'].imageURL = 'https://3.imimg.com/data3/PS/EM/MY-8901671/castrol-activ-xtra-engine-oil-250x250.jpg';
                servicePartsObj['EngineOil'].ebayURL = null;
                servicePartsObj['EngineOil'].shippingCost = null;
                servicePartsObj['EngineOil'].price = 6;
                servicePartsObj['EngineOil'].condition = 'brand new';
                servicePartsObj['EngineOil'].quantity = 4;
              case 'OilFilter':
                servicePartsObj['OilFilter'].valid = true;
                servicePartsObj['OilFilter'].partTitle = '[] BRAND OF OIL FILTER WILL BE DETERMINED BY MOTOFIX';
                servicePartsObj['OilFilter'].imageURL = 'https://ad-discountperformance.com/images/CH6012.jpg';
                servicePartsObj['OilFilter'].ebayURL = null;
                servicePartsObj['OilFilter'].shippingCost = null;
                servicePartsObj['OilFilter'].price = {};
                servicePartsObj['OilFilter'].price['@currencyId'] = 'USD';
                servicePartsObj['OilFilter'].price.__value__ = '10.00';
                servicePartsObj['OilFilter'].condition = 'brand new';
                servicePartsObj['OilFilter'].quantity = 1;
            }
        }
      }

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
    if(service === "OilChange"){
      // washer property removed for now
      var servicePartsObj = {
        OilFilter: {
          valid: null,
          partTitle: null,
          imageURL: null,
          ebayURL: null,
          shippingCost: null,
          price: null,
          condition: null,
          quantity: null
        },
        EngineOil: {
          valid: null,
          partTitle: null,
          imageURL: null,
          ebayURL: null,
          shippingCost: null,
          price: null,
          condition: null,
          quantity: null
        }
      }
      var oilWeight
      var oilVolume
      var oilQuantity

      let oilFilterURL
      let oilURL
// TODO: add error handling
      function getOilParts(lubricantsAndCapacities) {
        console.log(lubricantsAndCapacities)
        if(lubricantsAndCapacities.length) {
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
        } else { // if autodata api fails
          oilWeight = '';
          oilVolume = 1;
          oilQuantity = 4
        }


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
                // if oilspec was not retrieved from autodata, change name
                if (!lubricantsAndCapacities.length) {
                  servicePartsObj['EngineOil'].partTitle = 'BRAND & SPEC TO BE DETERMINED BY MOTOFIX';
                }
                const stringifiedObj = JSON.stringify(servicePartsObj)
                console.log('rounded oil quantity:' + Math.ceil(oilQuantity))
                return [stringifiedObj];
              })
              .catch((e) => {
                console.log(e)
                console.log(`failed: ${oilURL}`)
                const stringifiedObj = JSON.stringify(servicePartsObj)
                return [stringifiedObj];
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
