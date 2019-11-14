const md5 = require('md5');

const db = require('../db');

const login = (req, res) => res.render('login');

const checkLogin = (req, res) => {
    let email = req.body.email;
    let password = md5(req.body.password);
    let user = db.get('users').find({ email }).value();
    if (!user) {
        res.render('login', {
            errors: [ 'User is not existed' ],
            values: req.body
        });
        return;
    }
    if (user.password !== password) {
        res.render('login', {
            errors: [ 'Wrong password' ],
            values: req.body
        });
        return;
    }
    res.cookie('email', email, { signed: true })
        .cookie('password', password, { signed: true })
        .redirect('/users');
}

module.exports = {
    login,
    checkLogin
}