const postCreate = (req, res, next) => {
    let errors = [];
    if (!req.body.name) {
        errors.push("Name is required");
    }
    if (!req.body.age) {
        errors.push("Age is required");
    }
    if (!req.body.phone) {
        errors.push("Phone is required");
    }
    if (!req.body.password) {
        errors.push("Password is required");
    }
    if (!req.body.cfpassword) {
        errors.push("Confirm password is required");
    }
    if (req.body.password !== req.body.cfpassword) {
        errors.push("Password does not match");
    }
    if (errors.length) {
        res.render('users/create', { errors, values: req.body });
        return;
    }
    next();
}

module.exports = {
    postCreate
}