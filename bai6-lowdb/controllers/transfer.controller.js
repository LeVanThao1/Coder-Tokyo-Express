const Transfer = require('../models/transfer.model')

const index = (req, res, next) => {
    res.render('transfers/create', { csrfToken: req.csrfToken() });
}

const postTransfer = async (req, res, next) => {
    try {
        const data = {
            account: req.body.account,
            amount: parseFloat(req.body.amount).toFixed(2),
            userId: req.signedCookies.userId
        }
        await Transfer.create(data);
        res.redirect('/transfer/create');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    index,
    postTransfer
}
