const express = require('express');
const app = express();
const port = 3001;
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
db = low(adapter);
db.defaults({ users: [] })
  .write()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => res.render('index', {name: "Lê Văn Thảo"}));
app.get('/users', (req, res) => res.render('users/index', { users: db.get('users').value()  }));

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(( user ) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', { users: matchedUsers, q });
});

app.get('/users/create', (req, res) => res.render('users/create'));
app.post('/users/create', (req, res) => {
    // let data = req.body;
    let data = {
        id: shortid.generate(),
        name: req.body.name,
        age: req.body.age
    }
    db.get('users').push(data).write();
    res.redirect('/users');
});

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    console.log(user);
    res.render('users/user', {user: user});
});

app.listen(port, () => console.log('Server listen on port ' + port));
