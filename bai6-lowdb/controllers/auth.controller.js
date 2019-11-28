const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.model')

const login = (req, res) => res.render('login');

const checkLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email }).lean();
        if (!user) {
            res.render('login', {
                errors: [ 'User is not existed' ],
                values: req.body
            });
            return;
        }
        const isValiddatePassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isValiddatePassword) {
            res.render('login', {
                errors: [ 'Wrong password' ],
                values: req.body
            });
            return;
        }
        res.cookie('userId', user._id, { signed: true });
        res.redirect('/products');
    } catch(e) {
        next(e);
    }
}
module.exports = {
    login,
    checkLogin
}