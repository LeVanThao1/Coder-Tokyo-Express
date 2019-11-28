const postLogin = (req, res, next) => {
    let errors = [];
    if (!req.body.email) {
        errors.push("Email is required");
    }
    if (!req.body.password) {
        errors.push("Phone is required");
    }
    if (errors.length > 0) {
        res.render('login', { errors, values: req.body });
        return;
    }
    next();
}

module.exports = {
    postLogin
}