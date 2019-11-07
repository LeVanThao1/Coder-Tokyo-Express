const express = require('express');
const app = express();
const port = 3001;
var users = [
    {id: 1, name: "Sơn"},
    {id: 2, name:"Quang"}
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
app.listen(port, () => console.log('Server listen on port ' + port));
