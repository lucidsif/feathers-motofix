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
            host: '159.203.187.137',
            database: 'motofix_shared_backend_production',
            user: 'uz951x',
            password: 'swApwmsblDHRyX6'
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