console.log('inside knexfile');
console.log(process.env.POSTGRESQL_URL_INT);
console.log(process.env.POSTGRESQL_DATABASE);
console.log(process.env.POSTGRESQL_USERNAME);
console.log(process.env.POSTGRESQL_PASSWORD);
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
            host: '162.243.38.86',
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