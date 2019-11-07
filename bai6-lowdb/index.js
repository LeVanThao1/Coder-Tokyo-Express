const express = require('express');
const app = express();
const port = 3001;
const userRoute = require('./routes/user.route')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', {name: "Lê Văn Thảo"}));

app.use('/users', userRoute);

app.listen(port, () => console.log('Server listen on port ' + port));
