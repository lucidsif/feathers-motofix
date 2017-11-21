'use strict';
const app = require('./app');
const port = process.env.PORT || 3010;
console.log(port);
console.log(process.env.HOST);
console.log(process.env.DATABASE);
console.log(process.env.PASSWORD);
console.log(process.env.USERNAME);
const server = app.listen(port);
server.on('listening', () => console.log(`Feathers application started on ${app.get('host')}:${port}`));
//# sourceMappingURL=index.js.map