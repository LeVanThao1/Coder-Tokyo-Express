require('dotenv').config();
const express = require('express');
const app = express();
const csurf = require('csurf');
const port = 3001;
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');
const authRoute = require('./routes/auth.route');
const sessionMiddleware = require('./middlewares/cart.middleware');
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(sessionMiddleware.sessionId);
app.use(csurf({ cookie: true}));

app.get('/', authMiddleware.requireAuth, (req, res) => res.render('index', {name: "Lê Văn Thảo"}));
app.get('/logout', (req, res) => res.clearCookie('userId').render('login'));
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/', authRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);


app.listen(port, () => console.log('Server listen on port ' + port));
