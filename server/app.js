const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('./client-bundles'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client-bundles/index.html'));
});

// dynamically configure port - config.json
fs.readFile(path.resolve(`${__dirname}/config.json`), (err, appConfig) => {
  if (err) {
    console.log(err);
  }
  const port = appConfig && JSON.parse(appConfig.toString()).port ?
    JSON.parse(appConfig.toString()).port :
    process.env.PORT || 8080;

  app.set('port', port);
  app.listen(app.get('port'), () => console.log(`App listening on port...  ${app.get('port')}`));
});

module.exports = app;

