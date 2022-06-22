const pgPromise = require('pg-promise')
const config = {
    host: 'localhost',
    port: '5432',
    database: 'cuentasXpagar',
    user: 'postgres',
    password: 'williamsanchez199923'
}
const pgp = pgPromise({})
const db = pgp(config)
exports.db = db