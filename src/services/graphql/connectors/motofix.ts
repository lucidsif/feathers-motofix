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
        err ? reject(err) : resolve(JSON.parse(body))
      })
    })
  }
// TODO: understand uniqBy algorithm http://ilikekillnerds.com/2016/05/removing-duplicate-objects-array-property-name-javascript/ and clean code
// QUESTION: Add limit and offset params logic?
  public fetchPage(resource: string, offset?: number, limit?: number, filterByYear?: number | string, filterByMake?: string, keywords?: string) {
    filterByYear = Number(filterByYear);
    console.log(filterByMake);
    let yearFilteredBikes = [];
    let uniqueYearFilteredBikes = [];
    let makeFilteredBikes = [];
    let uniqueMakeFilteredBikes = [];

    function removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }

      return new Promise<any>((resolve, reject) => {
        this.fetch(resource).then((data) => {
          if(filterByYear){
            console.log(`filterByYear ran with year: ${filterByYear}`)
            yearFilteredBikes = data.filter((bike) => {
              if(bike.year === filterByYear){
                return bike;
              }
            })
            uniqueYearFilteredBikes = removeDuplicates(yearFilteredBikes, "make");
            if(filterByMake){
              console.log('filterByMake ran')
              let arr = uniqueYearFilteredBikes || data;
              makeFilteredBikes = yearFilteredBikes.filter((bike) => {
                if(bike.make.toLowerCase() === filterByMake.toLowerCase()){
                  return bike;
                }
              })
              uniqueMakeFilteredBikes = removeDuplicates(makeFilteredBikes, "model");
              resolve(uniqueMakeFilteredBikes);
            }
            resolve(uniqueYearFilteredBikes);
          } else if(filterByMake) {
            console.log('filterByMake ran')
            makeFilteredBikes = data.filter((bike) => {
              if(bike.make.toLowerCase() === filterByMake.toLowerCase()){
                return bike;
              }
            })
            uniqueMakeFilteredBikes = removeDuplicates(makeFilteredBikes, "model");
            resolve(uniqueMakeFilteredBikes);
          }
          else {
            console.log('no filter params were ran')
            resolve(data);
          }
            })
          })
  }
}
