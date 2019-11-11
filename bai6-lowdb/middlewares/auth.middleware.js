const db = require('../db');

const requireAuth = (req, res, next) => {
    if (!req.cookies.email) {
        res.redirect('/auth/login');
        return;
    }
    const user = db.get('users').find({ email: req.cookies.email }).value();
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    if (user.password !== req.cookies.password) {
        res.redirect('/auth/login');
        return;
    }
    next();
}
module.exports = {
    requireAuth
}