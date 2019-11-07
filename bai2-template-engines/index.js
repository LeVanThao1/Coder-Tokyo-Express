const express = require('express');
const app = express();
const port = 3001;
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => res.render('index', {name: "Lê Văn Thảo"}));
app.get('/user', (req, res) => res.render('users/index', {
    users: [
        {id: 1, name: "Sơn"},
        {id: 2, name:"Quang"}
    ]
    })
);
app.listen(port, () => console.log('Server listen on port ' + port));
