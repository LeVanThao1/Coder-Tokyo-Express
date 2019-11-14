const db = require('../db');

const requireAuth = (req, res, next) => {
    if (!req.signedCookies.email) {
        res.redirect('/auth/login');
        return;
    }
    const user = db.get('users').find({ email: req.signedCookies.email }).value();
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    if (user.password !== req.signedCookies.password) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}
module.exports = {
    requireAuth
}