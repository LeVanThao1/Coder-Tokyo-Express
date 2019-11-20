const postAdd = (req, res, next) => {
    const errors = [];
    if (!req.body.name) {
        errors.push('Name is require');
    }
    if (!req.body.price) {
        errors.push('Price is require');
    }
    if (!req.body.description) {
        errors.push('Description is require');
    }
    if (errors.length > 0) {
        res.render('products/add', { values: req.body, errors });
        return;
    }
    next();
}

module.exports = {
    postAdd
}