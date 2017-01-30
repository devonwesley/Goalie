// const { env } = require('./config/config')
const config = require('./db_config')['development']
const knex = require('knex')(config)

module.exports = knex
