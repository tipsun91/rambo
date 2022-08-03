// Импорт маршрутов.
module.exports = (app) => {
  app.use('/api/sign', require('../routes/sign')); // Вход/Выход & Регистрация
  app.use('/api/user', require('../routes/user')); // изменения данных юзера
  app.use('/api/statistics', require('../routes/statistics')); // Вход/Выход & Регистрация
  app.use('/', require('../routes/index')); // React client
  app.use('/hero', require('../routes/hero')); // роутер для улучшения характеристик героя
};
