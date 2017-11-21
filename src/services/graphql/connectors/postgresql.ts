import * as knex from 'knex';
import * as config from '../knexfile.js';
const env = process.env.ENVIRONMENT || 'development';
// Eventually we want to wrap Knex to do some batching and caching, but for
// now this will do since we know none of our queries need it
//

export default knex(config[env]);
