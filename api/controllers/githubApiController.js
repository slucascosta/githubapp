'use strict';
const request = require('request');
const parse = require('parse-link-header');
const host = 'https://api.github.com';
const hostToken = 'access_token=26add60ec1a81f008f0b82c08e5375c38e786e2d';
const usersPerPage = 10;
const api = {
  getUsers: (param) => '/users?per_page=' + usersPerPage + '&since=' + param + '&',
  getUserDetails: (param) => '/users/' + param + '?',
  getUserRepos: (param) => '/users/' + param + '/repos?'
}

exports.listUsers = function(req, res){
  let since;

  if(req.query.since)
    since = req.query.since;
  else {
    res.json({ error: "Parâmetro não encontrato: since." });
    return;
  }

  if(isNaN(since)){
    res.json({ error: "O parâmetro 'since' deve ser um número." });
    return;
  }

  callExternalApi(api.getUsers(since), res,
    function (callResponse) {
      let next = parse(callResponse.headers.link).next;
      let urlNext = req.originalUrl.replace(since, next.since);

      let ret = { next: urlNext, data: callResponse.body};
      res.json(ret);
    });
  };

exports.listUsersDetails = function(req, res) {
  let username;

  if (req.params.username)
    username = req.params.username.trim();

  if (username == "") {
    res.json({ error: "Username inválido." });
    return;
  }

  callExternalApi(api.getUserDetails(username), res);
};

exports.listUsersRepos = function(req, res) {
  let username;

  if (req.params.username)
    username = req.params.username.trim();

  if (username == "") {
    res.json({ error: "Username inválido." });
    return;
  }

  callExternalApi(api.getUserRepos(username), res);
};

function callExternalApi(api, response, callback) {
  api = host + api + hostToken;

  request(api, { headers: { 'User-Agent': 'Awesome-Octocat-App' }, json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      } else if (res.statusCode !== 200){
        response.json({ error: body });
      } else if(callback) {
        callback(res);
      } else {
        response.json(body);
      }
    }
  );
}