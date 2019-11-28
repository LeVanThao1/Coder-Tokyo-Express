const Session = require('../models/session.model')

const generateSession = async (req, res, next) => {
    try {
        if (!req.signedCookies.sessionId) {
            const getSession = await Session.findOne({ userId: req.signedCookies.userId }).lean();
            if (!getSession) {
                const createSession = await Session.create({ userId: req.signedCookies.userId });
                res.cookie('sessionId', createSession._id, { signed: true });
            } else {
                res.cookie('sessionId', getSession._id, { signed: true });
            }
            next();
        }
        const session = await Session.findOne({ _id: req.signedCookies.sessionId }).lean();
        if (!session) {
            res.redirect('/auth/login');
            return;
        }
        next();
    } catch (e) {
        next(e);
    } 
}

module.exports = {
    generateSession
}