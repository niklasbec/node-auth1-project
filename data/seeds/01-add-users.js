
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {id: 1, username: 'admin1', password: 'password1'},
        {id: 2, username: 'admin2', password: 'password2'},
        {id: 3, username: 'admin3', password: 'password3'}
      ]);
    });
};
