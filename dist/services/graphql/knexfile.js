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
            host: '10.128.5.166',
            database: 'motofix_shared_backend_test_production',
            user: 'ut8h3d',
            password: '3QmSHng0u4JPVy8'
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