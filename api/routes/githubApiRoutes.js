'use strict';
module.exports = function(app) {
  let githubApi = require('../controllers/githubApiController');

  app.route('/api/users')
    .get(githubApi.listUsers);

  app.route('/api/users/:username/details')
    .get(githubApi.listUsersDetails);

    app.route('/api/users/:username/repos')
    .get(githubApi.listUsersRepos);
}