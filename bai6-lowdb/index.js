require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const userRoute = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');
const authRoute = require('./routes/auth.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.get('/', authMiddleware.requireAuth, (req, res) => res.render('index', {name: "Lê Văn Thảo"}));

app.use('/users', userRoute);
app.use('/', authRoute);

app.listen(port, () => console.log('Server listen on port ' + port));
