const Product = require('../models/product.model');

const index = async (req, res, next) => {
    try {
        const currentPage = parseInt(req.query.currentPage) || 1, perpage = 8;
        const countPro = await Product.find().lean();
        const totalPage = countPro.length % perpage === 0 ? countPro.length / perpage : parseInt(countPro.length / perpage) + 1;
        const products = await Product.find().lean().limit(perpage).skip((currentPage-1) * perpage);
        return res.render('products/index', { products: products, pages: totalPage, currentPage: currentPage, range: 8 });
    } catch (e) {
       next(e);
    }
   
}

const getPage = (req, res) => {
    res.render('products/add');
}

const addProduct = async (req, res) => {
    try {
        const product = req.body;
        product.image = req.file.path.split('\\').slice(1).join('/');
        const result = await Product.create(product);
        return res.redirect('/products');
    } catch (e) {
        next(e);
    }
}
module.exports = {
    index,
    getPage,
    addProduct
}