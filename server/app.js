const express = require('express');
const postRouter = require('./routes/postRoutes');
const viewRouter = require('./routes/viewRoutes');
const ErrorThrower = require('./utils/ErrorThrower');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// const path = require('path');
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
// });

// app.set('view engine', 'react');

// app.use(express.static(directory));

app.use('/', viewRouter);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
  next(new ErrorThrower(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
