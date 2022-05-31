const path = require('path')
const express = require('express')
var exphbs = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

//template engine
app.engine('hbs', exphbs.engine({
    extname : '.hbs'
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

//HTTP logger
app.use(morgan('combined'))

app.get('/', (req, res) => res.render('home'))
app.get('/news', (req, res) => res.render('news'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))