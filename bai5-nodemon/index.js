const express = require('express');
const app = express();
const port = 3001;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
var users = [
    { id: 1, name: "Sơn", age: 15 },
    { id: 2, name:"Tuang", age: 13 }
];
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => res.render('index', {name: "Lê Văn Thảo"}));
app.get('/users', (req, res) => res.render('users/index', { users }));

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = users.filter(( user ) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', { users: matchedUsers, q });
});
app.get('/users/create', (req, res) => res.render('users/create'));
app.post('/users/create', (req, res) => {
    let data = req.body;
    let user = {
        id: users.length,
        name: req.body.name,
        age: req.body.age
    };
    users.push(user);
    res.redirect('/users');
});
app.listen(port, () => console.log('Server listen on port ' + port));
