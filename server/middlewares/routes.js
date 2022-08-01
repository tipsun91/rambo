// Импорт маршрутов.
module.exports = (app) => {
  app.use('/sign', require('../routes/sign'));    // Вход/Выход & Регистрация
  app.use('/api',  require('../routes/api'));    // Вход/Выход & Регистрация
  app.use('/',     require('../routes/index'));   // React client
};
