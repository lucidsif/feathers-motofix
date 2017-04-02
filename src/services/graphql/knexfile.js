// Update with your config settings.

module.exports = {

  development: {
      client: 'postgresql',
      connection: {
          database: 'motofix_local',
          user: 'Sif',
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'motofix',
      user:     'Sif',
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
      host: process.env.POSTGRESQL_ADDRESS_INT,
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
