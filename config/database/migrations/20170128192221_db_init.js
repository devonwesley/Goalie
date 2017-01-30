
exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('goals', table => {
      table.string('id').primary()
      table.string('title')
      table.integer('number')
      table.specificType('label_ids', 'text[]')
      table.string('level_id')
      table.string('github_handle')
      table.string('body')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('comments', table => {
      table.string('id').primary()
      table.string('goal_id')
      table.string('body')
      table.string('github_handle')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('labels', table => {
      table.string('id').primary()
      table.string('title')
    }),

    knex.schema.createTable('levels', table => {
      table.string('id').primary()
      table.string('number')
    })
  ])

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('goals'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('labels'),
    knex.schema.dropTable('levels')
  ])
