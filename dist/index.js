'use strict';
const app = require('./app');
const port = process.env.PORT || 3000;
console.log(port);
console.log(process.env.WEB_ADDRESS_EXT);
console.log(process.env.WEB_ADDRESS_INT);
console.log(process.env.WEB_ADDRESSES_EXT);
console.log(process.env.WEB_ADDRESSES_INT);
console.log(process.env.POSTGRESQL_ADDRESS);
console.log(process.env.POSTGRESQL_SLAVE_ADDRESSES);
console.log(process.env.POSTGRESQL_URL);
console.log(process.env.POSTGRESQL_DATABASE);
console.log(process.env.POSTGRESQL_USERNAME);
const server = app.listen(port);
server.on('listening', () => console.log(`Feathers application started on ${app.get('host')}:${port}`));
//# sourceMappingURL=index.js.map