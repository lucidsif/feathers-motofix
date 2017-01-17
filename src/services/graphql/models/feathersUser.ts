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
      uri: `http://${this.app.get('host')}:${this.app.get('port')}/auth/local}`,
      body: { email, password },
      json: true
    }
    console.log(options)
    rp(options)
      .then((response) => {
        return response
      })
      .catch((e) => {
        console.log(e)
      })
  }

}
