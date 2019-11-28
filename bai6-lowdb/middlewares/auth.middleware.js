const User = require('../models/user.model')

const requireAuth = async (req, res, next) => {
    try {
        if (!req.signedCookies.userId) {
            res.redirect('/auth/login');
            return;
        }
        const user = await User.findOne({ _id: req.signedCookies.userId}).lean();
        if (!user) {
            res.redirect('/auth/login');
            return;
        }
        res.locals.user = user;
        next(); 
    } catch (e) {
        next(e);
    }
}
module.exports = {
    requireAuth
}