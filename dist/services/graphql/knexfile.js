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
    production: {
        client: 'postgresql',
        connection: {
            host: '10.128.20.31',
            database: 'motofix_shared_backend_test_production',
            user: 'u60lj4',
            password: 'Az7Gh8R6LUKBPQA'
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