'use strict';

const app = require('./app');
const port = app.get('port');
console.log(process.env.PORT)
console.log(process.env.POSTGRESQL_ADDRESS)
console.log(process.env.POSTGRESQL_DATABASE)
console.log(process.env.POSTGRESQL_USERNAME)
console.log(process.env.WEB_ADDRESSES)
const server = app.listen(process.env.PORT || port);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
