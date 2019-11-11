const shortid = require('shortid');
const db = require('../db');

const index = (req, res) => res.render('users/index', { users: db.get('users').value() });

const create = (req, res) => res.render('users/create');

const search = (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(( user ) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', { users: matchedUsers, q });
};

const postCreate =  (req, res) => {
    // let data = req.body;
    let errors = [];
    if (!req.body.name) {
        errors.push("Name is required");
    }
    if (!req.body.age) {
        errors.push("Age is required");
    }
    if (!req.body.phone) {
        errors.push("Phone is required");
    }
    if (errors.length) {
        res.render('users/create', { errors, values: req.body });
        return;
    }
    let data = {
        id: shortid.generate(),
        name: req.body.name,
        age: req.body.age
    }
    db.get('users').push(data).write();
    res.redirect('/users');
};

const getUser = (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    console.log(user);
    res.render('users/user', {user: user});
};

module.exports = {
    index,
    create,
    search,
    postCreate,
    getUser
}