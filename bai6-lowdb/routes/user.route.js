const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const db = require('../db');

router.get('/', (req, res) => res.render('users/index', { users: db.get('users').value()  }));

router.get('/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(( user ) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', { users: matchedUsers, q });
});

router.get('/create', (req, res) => res.render('users/create'));
router.post('/create', (req, res) => {
    // let data = req.body;
    let data = {
        id: shortid.generate(),
        name: req.body.name,
        age: req.body.age
    }
    db.get('users').push(data).write();
    res.redirect('/users');
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    console.log(user);
    res.render('users/user', {user: user});
});

module.exports = router;