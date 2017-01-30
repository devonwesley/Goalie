const knex = require('../config/database/knex')

const firstRecord = records => records[0]

const createRecord = (table, attributes) =>
  knex
    .table(table)
    .insert(attributes)
    .returning('*')
    .then(firstRecord)

const findRecord = (table, column, data) =>
  knex
    .table(table)
    .where(column, data)
    .returning('*')
    .then(firstRecord)

const findAllRecords = (table, column, data) =>
  knex
    .table(table)
    .where(column, data)
    .returning('*')

const findAll = table =>
  knex
    .table(table)
    .returning('*')

const updateRecord = (table, column, data, attributes) =>
  knex
    .table(table)
    .where(column, data)
    .update(attributes)
    .returning('*')
    .then(firstRecord)

const deleteRecord = (table, column, data) =>
  knex
    .table(table)
    .where(column, data)
    .del()

module.exports = {
    createRecord,
    deleteRecord,
    findRecord,
    firstRecord,
    updateRecord,
    findAllRecords,
    findAll
}
