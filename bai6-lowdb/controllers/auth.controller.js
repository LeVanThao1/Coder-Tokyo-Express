const md5 = require('md5');

const db = require('../db');

const login = (req, res) => res.render('login');

const checkLogin = (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    const user = db.get('users').find({ email }).value();
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
    res.cookie('userId', user.id, { signed: true })
        .redirect('/products');
}
module.exports = {
    login,
    checkLogin
}