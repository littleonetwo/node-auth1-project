
exports.seed = function(knex, Promis) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "guy1", password: 'rowValue1'},

      ]);
    });
};
