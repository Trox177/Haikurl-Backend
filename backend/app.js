require('dotenv/config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./config/database');
const bodyParser = require('body-parser');
const router = require('./routes/urlRouter');
const { errorLogger, errorResponder, failSafeHandler } = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: '*',
    methods: ['GET', 'POST'],
  }),
);
app.use(helmet());
app.use(bodyParser.json());
app.use(router);
app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Succesfully connected to database'));
app.listen(process.env.PORT || 3000, () => console.log('Starting server'));
