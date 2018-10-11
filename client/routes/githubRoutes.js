'use strict';
const github = require('../controllers/githubController');
exports.users = github.listUsers;
exports.userDetail = github.listUsersDetails;
exports.userRepos = github.listUsersRepos;