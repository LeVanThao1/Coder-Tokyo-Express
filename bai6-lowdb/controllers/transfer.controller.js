const db = require('../db');
const shortid = require('shortid');

const index = (req, res, next) => {
    res.render('transfers/create', { csrfToken: req.csrfToken() });
}

const postTransfer = (req, res, next) => {
    const data = {
        id: shortid.generate(),
        account: req.body.account,
        amount: parseInt(req.body.amount),
        userId: req.signedCookies.userId
    }
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create');
}

module.exports = {
    index,
    postTransfer
}
