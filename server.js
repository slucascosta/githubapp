let express = require('express');
let app = express();
let port = 3001;

let routes = require('./api/routes/githubApiRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: 'Endereço não encontrado: ' + req.originalUrl});
});
app.listen(port);