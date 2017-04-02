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
            host: '10.128.11.84',
            database: 'motofix_split_backend_production',
            user: 'u78z6y',
            password: 'dpa52pFgTsjbklP'
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