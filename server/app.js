require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
// const tems = require('./routes/tems');
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cors')({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

// Static content: web-client path AS virtual, server path
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.resolve('public')));

require('./middlewares/session')(app);
require('./middlewares/routes')(app);
//app.use('/game', tems);

const { sequelize } = require('./db/models');

// app.locals.settings.PORT & etc.
app.listen(process.env.PORT, async () => {
  console.log(`Server started at port: ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
