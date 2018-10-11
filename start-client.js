let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.set('views', './client/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

let routes = require('./client/routes/githubRoutes');
app.get('/', function(req, res) { res.redirect('/users') });
app.get('/users', routes.users);
app.get('/users/:username/details', routes.userDetail);

app.use(function(req, res) {
  res.status(404).send({ url: 'Endereço não encontrado: ' + req.originalUrl});
});
app.listen(port);