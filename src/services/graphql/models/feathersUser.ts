import * as rp from 'request-promise';

// TODO: change names to more clearly define what this does

export default class User {
  public app: any
// app is the feathersJS app passed to the instant of this clas
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
    console.log('login parameters: ' + email + ',' + password);
    const options = {
      method: 'POST',
      uri: `${process.env.POSTGRESQL_ADDRESS_INT}/auth/local`,
      body: { email, password },
      json: true
    }
    //console.log(options)
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
    console.log(Users);

    const jwtOptions = {
      method: 'POST',
      uri: `${process.env.POSTGRESQL_ADDRESS_INT}/auth/token`,
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
