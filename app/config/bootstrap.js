const bootstrap = () => {
  const fs = require('fs');
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const https = require('https');
  const dotenv = require('dotenv');
  const mongoose = require('mongoose');
  let cors = require('cors');
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 5000;
  const key = fs.readFileSync('./key.pem');
  const cert = fs.readFileSync('./cert.pem');

  const server = https.createServer({key: key, cert: cert}, app);

  dotenv.config();
  const apiRouter = require('./routes');

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json());
  app.use(cors(corsOptions));

  app.use('/static', express.static('public'));


  //route middelwares
  app.use('/api/v1', apiRouter);

  //Connect to DB
  mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    () => console.log('Connected to DB')
  )


  server.listen(Number(port), host, function () {
    console.log('listening on ', host, port)
  })
};

module.exports = bootstrap;