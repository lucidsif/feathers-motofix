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

  public logIn(email?: string, password?:string){
    console.log('login parameters: ' + email + ',' + password);
    const options = {
      method: 'POST',
      uri: `http://localhost:3030/auth/local`,
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

  public getViewer(context: any){
    let Viewer = this.app['service']('viewer')
    console.log('getViewer function called')
    //console.log(Viewer);
    console.log(`token from context: ${context}`);
    return Viewer.find(context)
      .then((response) => {
      console.log('view success')
      //console.log(response)
      })
      .catch((err) => {
      console.log(err)
      })
  }

}
