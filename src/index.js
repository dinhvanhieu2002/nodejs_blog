const path = require('path');
const express = require('express');
var exphbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

//template engine
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//HTTP logger
// app.use(morgan('combined'))

//Route init
route(app);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
