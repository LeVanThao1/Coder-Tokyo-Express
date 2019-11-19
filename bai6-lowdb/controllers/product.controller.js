const db = require('../db');

const index = (req, res) => {
    const currentPage = parseInt(req.query.currentPage) || 1, perpage = 8, start = (currentPage - 1) * perpage, countPro = db.get('products').value().length, totalPage = countPro % perpage === 0 ? countPro / perpage : countPro / perpage + 1;
    res.render('products/index', { products: db.get('products').drop(start).take(perpage).value(), pages: totalPage, currentPage: currentPage, range: 8 });
}

module.exports = {
    index
}