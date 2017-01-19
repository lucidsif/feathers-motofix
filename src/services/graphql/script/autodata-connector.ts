/*
return new Promise((resolve, reject) => {
  var modelid
  var mid
  var yearRange
  var links
  // get model ids by manufacturer id
  this.fetch(`${resource}manufacturers/${manufacturerID}?country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`)
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
      this.fetch(`${resource}vehicles?model_id=${modelid}&country-code=us&page=1&limit=90&api_key=wjvfv42uwdvq74qxqwz9sfda`)
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
          this.fetch(`${resource}vehicles/${mid}?links=yes&country-code=us&api_key=wjvfv42uwdvq74qxqwz9sfda`)
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
        })
    })
    .catch((err) => {
      console.log(err)
    })
})

  */
