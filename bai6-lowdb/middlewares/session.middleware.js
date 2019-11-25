const shortid = require('shortid');
const db = require('../db');

const sessionId = (req, res, next) => {
    if (req.signedCookies.userId) {
        const session = db.get('sessions').find({userId: req.signedCookies.userId}).value();
        if (!session) {
            const sessionId = shortid.generate();
            res.cookie('sessionId', sessionId, { signed: true });
            db.get('sessions').push({ id: sessionId, userId: req.signedCookies.userId }).write();
        } else {
            res.cookie('sessionId', session.id, { signed: true });
        }
    } 
    if (!req.signedCookies.sessionId) {
        const sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, { signed: true });
        db.get('sessions').push({ id: sessionId }).write();
    }
    next();
}

module.exports = {
    sessionId
}