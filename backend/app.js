const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./errors/handleError');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const NotFoundError = require('./errors/NotFoundError');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
      ),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.get('/logout', logout);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => next(new NotFoundError('Маршрут не найден')));

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => handleError({ res, err, next }));

app.listen(PORT);
