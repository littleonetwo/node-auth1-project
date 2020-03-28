exports.up = async (knex) => {
    await knex.schema.createTable("users", (users) => {
      users.increments()
      users.string("username", 20).notNullable().unique()
      users.string("password", 20).notNullable()
    })
  }

  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("users")
  }
