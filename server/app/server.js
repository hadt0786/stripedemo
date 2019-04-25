const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const logger = require('./logger');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.enable('trust proxy');

// app.use(cors());
app.use(cors({
  origin: ['https://localhost:4200', 'http://localhost:4200', 'https://localhost:3000', 'http://localhost:3000', 'http://127.0.0.1:4200', 'http://127.0.0.1:3000', 'http://104.248.187.179:4200', 'http://104.248.187.179:3000', 'http://dev.contactly.io:3000', 'https://dev.contactly.io:3000', 'http://dev.contactly.io', 'https://dev.contactly.io', 'https://staging.contactly.io', 'http://staging.contactly.io', 'http://staging.contactly.io:3000', 'https://staging.contactly.io:3000', 'http://159.89.147.229', 'https://159.89.147.229'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']

}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTime());

app.get('/', (req, res) => {
  res.status(200).send('Application Started!').end();
});

require('./routes')(app);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  logger.debug(`We are live on ${PORT}`);
});

var mongoDB = process.env.DB;
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

db.once('open', () => {
  console.log('connected to mongo db server');
})

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// catch 404 and forward to error handler
app.use((req, res) => {
  res.setHeader('User', 'Invalid');
  res.status(404).send({
    code: 404,
    description: 'Requested path not found',
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
  next();
});
