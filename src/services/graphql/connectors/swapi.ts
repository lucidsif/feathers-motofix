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

  public fetchPage(resource: string, offset?: number, limit?: number) {
    let results = []
    let index = 0
    const size = limit || 0

    function pagination(pageURL: string) {
      return new Promise<any>((resolve, reject) => {
        this.fetch(pageURL).then((data) => {
          // fast forward until offset is reached
          if (offset && results.length === 0) {
            // if length of data is greater than offset, slice to get offsetted data and store in result
            if (index + data.results.length > offset) {
              results = data.results.slice(offset - index)
            }
            // if there is more data, mutate index to current index and recursively
            // call pagination  with the next data and resolve with that value
            if (data.next) {
              index = index + data.results.length
              pagination.call(this, data.next).then(resolve)
            } else {
              resolve(results)
            } // if offset and results is not 0
          } else {
            // if limit is true and the
            if (size > 0 && size - results.length - data.results.length < 0) {
              results = results.concat(data.results.slice(0, size - results.length))
            } else {
              results = results.concat(data.results)
            }
            if (data.next && (size === 0 || size - results.length > 0)) {
              pagination.call(this, data.next).then(resolve)
            } else {
              resolve(results)
            }
          }
        })
      })
    }

    return pagination.call(this, resource)
  }
}
