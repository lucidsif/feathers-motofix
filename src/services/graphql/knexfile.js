// Update with your config settings.

module.exports = {

  development: {
      client: 'postgresql',
      connection: {
        host: process.env.POSTGRESQL_HOST || 'localhost',
        database: process.env.POSTGRESQL_DATABASE || 'motofix_local',
        user:     process.env.POSTGRESQL_USERNAME || 'sif',
        password: process.env.POSTGRESQL_PASSWORD || null
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRESQL_DATABASE,
      user:     process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
