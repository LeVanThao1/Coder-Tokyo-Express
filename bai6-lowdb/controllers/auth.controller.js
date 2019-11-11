const db = require('../db');
const login = (req, res) => res.render('login');

const checkLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
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
    res.cookie('email', email)
        .cookie('password', password)
        .redirect('/users');
}

module.exports = {
    login,
    checkLogin
}