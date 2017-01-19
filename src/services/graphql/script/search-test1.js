const Fuse = require('fuse.js');

const response = {
  "data": [{
    "mid": "KAW01359",
    "manufacturer": "Kawasaki",
    "model": "KLR",
    "model_variant": "250 (KL 250D)",
    "engine_code": null,
    "body_num": 15300027,
    "litres": 249,
    "tuning": null,
    "tuning_description": null,
    "start_year": 1990,
    "end_year": 2005,
    "fuel": "P",
    "kw": 17,
    "din_hp": 23,
    "rpm": 9000,
    "href": "\/motorcycles\/v1\/vehicles\/KAW01359?country-code=us"
  }, {
    "mid": "KAW01361",
    "manufacturer": "Kawasaki",
    "model": "KLR",
    "model_variant": "250 (KL 250D)",
    "engine_code": null,
    "body_num": 15300027,
    "litres": 249,
    "tuning": null,
    "tuning_description": null,
    "start_year": 1985,
    "end_year": 1989,
    "fuel": "P",
    "kw": 21,
    "din_hp": 28,
    "rpm": 9000,
    "href": "\/motorcycles\/v1\/vehicles\/KAW01361?country-code=us"
  }, {
    "mid": "KAW01357",
    "manufacturer": "Kawasaki",
    "model": "KLR",
    "model_variant": "250 (KL250D)",
    "engine_code": null,
    "body_num": 15300027,
    "litres": 249,
    "tuning": 161,
    "tuning_description": "Canada",
    "start_year": 1990,
    "end_year": 2005,
    "fuel": "P",
    "kw": 17,
    "din_hp": 23,
    "rpm": 9000,
    "href": "\/motorcycles\/v1\/vehicles\/KAW01357?country-code=us"
  }, {
    "mid": "KAW01365",
    "manufacturer": "Kawasaki",
    "model": "KLR",
    "model_variant": "600 (KL 600B)",
    "engine_code": null,
    "body_num": 15300027,
    "litres": 564,
    "tuning": null,
    "tuning_description": null,
    "start_year": 1985,
    "end_year": 1986,
    "fuel": "P",
    "kw": 31,
    "din_hp": 42,
    "rpm": 7000,
    "href": "\/motorcycles\/v1\/vehicles\/KAW01365?country-code=us"
  }, {
    "mid": "KAW01368",
    "manufacturer": "Kawasaki",
    "model": "KLR",
    "model_variant": "650 (KL 650A)",
    "engine_code": null,
    "body_num": 15300027,
    "litres": 651,
    "tuning": null,
    "tuning_description": null,
    "start_year": 1987,
    "end_year": 2013,
    "fuel": "P",
    "kw": 35,
    "din_hp": 48,
    "rpm": 6500,
    "href": "\/motorcycles\/v1\/vehicles\/KAW01368?country-code=us"
  }, {
    "mid": "KAW08823",
    "manufacturer": "Kawasaki",
    "model": "KLR",
    "model_variant": "650 New Edition (KL 650)",
    "engine_code": null,
    "body_num": 15300027,
    "litres": 651,
    "tuning": null,
    "tuning_description": null,
    "start_year": 2014,
    "end_year": 2017,
    "fuel": "P",
    "kw": 35,
    "din_hp": 48,
    "rpm": 6500,
    "href": "\/motorcycles\/v1\/vehicles\/KAW08823?country-code=us"
  }],
  "metadata": {
    "total": 6,
    "page": 1,
    "pages": 1,
    "limit": 90,
    "links": {
      "self": {
        "href": "\/motorcycles\/v1\/vehicles?model_id=15300027&country-code=us&page=1&limit=90"
      },
      "first": {
        "href": "\/motorcycles\/v1\/vehicles?model_id=15300027&country-code=us&page=1&limit=90"
      },
      "last": {
        "href": "\/motorcycles\/v1\/vehicles?model_id=15300027&country-code=us&page=1&limit=90"
      }
    }
  }
}

const testYear = "2015"


// my algorithm for checking if a year is between two years
function isBetweenYears(start, end, check){
  let givenDiff = end - start;
  let checkDiff = check - start;
  if(checkDiff <= givenDiff){
    return check
  }
  return null
}
let originalResults = response.data;
let yearResults = response.data.map((mid) => {
  // write func that can determine if a year is in between two years - if true, return that year
  // return the mid, description, yearstart, yearend, and year
  if(isBetweenYears(mid.start_year, mid.end_year, testYear)){
    return {
      mid: mid.mid,
      model: mid.model,
      model_variant: mid.model_variant,
      start_year: mid.start_year,
      end_year: mid.end_year,
      year: isBetweenYears(mid.start_year, mid.end_year, testYear)
    }
  }
  return { mid: null }
})

console.log(yearResults)

// fuse doesn't seem to be able to search by numbers!!!
let options = {
  include: ["score"],
  keys: ['year'],
  id: 'mid'
}
var fuseMidArr = new Fuse(yearResults, options)
let results = fuseMidArr.search('KLR 650 2015')

console.log(results)









