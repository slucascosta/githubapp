'use strict';
const fetch = require('node-fetch');
const host = 'http://localhost:3001/api/users';
const api = {
  getUsers: (param) => '?since=' + param,
  getUserDetails: (param) => '/' + param + '/details',
  getUserRepos: (param) => '/' + param + '/repos'
}

exports.listUsers = function(req, res){
  let since = req.query && req.query.since || 0;

  callExternalApi(api.getUsers(since), function(json) {
    let next = json.next.replace('/api/users?since=', '');

    res.render('listUsersView', { data: json.data, first: '/users', next: api.getUsers(next) });
  });
};

exports.listUsersDetails = function(req, res) {
  let username = req.params && req.params.username || "";

  if(username)
    username = username.trim();
  else {
    res.json({ error: "Login Inválido"});
    return;
  }
  
  callExternalApi(api.getUserDetails(username), function(json){
    callExternalApi(api.getUserRepos(username), function(jsonRepos){
      res.render('userDetails', {
        id: json.id, login: json.login, name: json.name, url: json.html_url, createdAt: json.created_at, repos: jsonRepos });
    });
  });
};

async function callExternalApi(api, callback) {
  api = host + api;

  fetch(api)
    .then(res => res.json())
    .then(json => callback(json));
}