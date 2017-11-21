module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            database: 'motofix_local',
            user: 'sif',
            password: null
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
            host: process.env.POSTGRESQL_HOST,
            database: process.env.POSTGRESQL_DATABASE,
            user: process.env.POSTGRESQL_USERNAME,
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
//# sourceMappingURL=knexfile.js.map