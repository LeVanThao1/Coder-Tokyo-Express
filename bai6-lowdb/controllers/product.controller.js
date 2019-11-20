const db = require('../db');
const shortid = require('shortid');

const index = (req, res) => {
    const currentPage = parseInt(req.query.currentPage) || 1, perpage = 8, start = (currentPage - 1) * perpage, countPro = db.get('products').value().length, totalPage = countPro % perpage === 0 ? countPro / perpage : parseInt(countPro / perpage) + 1;
    res.render('products/index', { products: db.get('products').drop(start).take(perpage).value(), pages: totalPage, currentPage: currentPage, range: 8 });
}

const getPage = (req, res) => {
    res.render('products/add');
}

const addProduct = (req, res) => {
    const product = req.body;
    product.id = shortid.generate();
    product.image = req.file.path.split('\\').slice(1).join('/');
    db.get('products').push(product).write();
    res.redirect('/products');
}
module.exports = {
    index,
    getPage,
    addProduct
}