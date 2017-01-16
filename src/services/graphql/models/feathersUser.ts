// TODO: change names to more clearly define what this does

export default class User {
  public app: any
// app is the feathersJS app passed to the instant of this clas
  constructor(app){
    this.app = app
  }

  public createUser(email?: string, password?: string){
    console.log('parameters: ' + email + ',' + password);
    //console.log(this.app)
    let Users = this.app['service']('users')
    let args = { email, password };
    //let args = {email: 'sif2@gmail.com', password: 'calls'};

    return Users.create(args).then((response) => {
      console.log(response);
      return response.dataValues;
    })
      .catch((e) => {
        console.log(e)
      })
  }
}
