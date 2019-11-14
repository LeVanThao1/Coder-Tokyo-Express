const db = require('../db');

const index = (req, res) => {
    res.render('products/index', { products: db.get('products').value() });
}

module.exports = {
    index
}