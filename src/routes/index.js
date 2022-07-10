const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const userRouter = require('./user');

function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
