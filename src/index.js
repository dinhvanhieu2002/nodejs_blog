const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const User = require('../src/app/models/User');
const { mongooseToObject } = require('./util/mongoose');

const port = 3000;
app.set('port', process.env.port || 3000);

const server = app.listen(app.get('port'), () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
const io = require('socket.io')(server);
require('./app/controllers/ChatController')(io);

const route = require('./routes');
const db = require('./config/db');
db.connect();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//template engine
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//HTTP logger
// app.use(morgan('combined'))

//flash message
app.use(cookieParser('secret_passcode'));
app.use(
    expressSession({
        secret: 'secret_passcode',
        cookie: {
            maxAge: 4000000,
        },
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    // res.locals.messageError = req.flash('error');
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = mongooseToObject(req.user);
    // res.locals.user = req.user;
    console.log(res.locals.flashMessages);
    // console.log(res.locals.loggedIn);
    // console.log(res.locals.currentUser);

    // console.log(res.locals.user);
    next();
});

//Route init
route(app);

// app.use((req, res, next) => {
//     res.locals.user = req.user;
//     console.log(res.locals.user);
//     next();
// });
