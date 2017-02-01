import * as rp from 'request-promise';
// use production env or local
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3000';

// TODO: change names to more clearly define what this does

export default class User {
  public app: any
// app is the feathersJS app passed to the instant of this class
  constructor(app){
    this.app = app
  }

  public createUser(email?: string, password?: string){
    console.log('createuser parameters: ' + email + ',' + password);
    let Users = this.app['service']('users')
    let args = { email, password };

    return Users.create(args).then((response) => {
      console.log(response);
      return response.dataValues;
    })
      .catch((e) => {
        console.log(e)
      })
  }

  public logIn(email?: string, password?: string){
    const options = {
      method: 'POST',
      uri: `http://${host}/auth/local`,
      body: { email, password },
      json: true
    }
    return rp(options)
      .then((response) => {
        console.log('login mutation success')
        console.log(response)

        return response
      })
      .catch((e) => {
        console.log(e)
      })
  }
  // TODO: get user id from token
  // TODO: figure out how to automatically extract jwt from feathers and use it - maybe first has something to do with tokenKey which is extracted from localstorage?
  public postToken(token?: any){
    let Users = this.app['service']('users')

    const jwtOptions = {
      method: 'POST',
      uri: `http://${host}/auth/token`,
      headers: {
        authorization: token
      },
      json: true
    }

    return rp(jwtOptions)
      .then((response) => {
        console.log('getViewer query success')
        console.log(response)

        return response.data
      })
      .catch((e) => {
        console.log(e)
      })
  }

}
