// TODO: pass parameters to createUser function
/*
export default function createUser(email, password, feathersApp) {


  console.log('parameters: ' + email + ',' + password);
  const app = this;
  let Users = app.service('users');
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
*/
// export as function and point this to feathers.js
/*
export default class User {
  constructor(){
    this
  }

  public createUser(email?: string, password?: string){
      console.log('parameters: ' + email + ',' + password);
      const app = this;
      let Users = app['service']('users');
      let args = {email: 'sif2@gmail.com', password: 'calls'};
      return Users.create(args).then((response) => {
      console.log(response);
      return response.dataValues;
      })
    .catch((e) => {
    console.log(e)
     })
  }
}
*/


