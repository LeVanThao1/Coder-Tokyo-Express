const db = require('../db');

const addToCart = (req, res, next) => {
    const productId = req.params.productId;
    const sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    const count = db.get('sessions').find({ id: sessionId }).get('cart.' + productId, 0).value();

    db.get('sessions').find({ id: sessionId }).set('cart.' + productId, count + 1).write();
    res.redirect('/products');
}

const getCart = (req, res, next) => {
    const sessionId = req.signedCookies.sessionId;
    const listIdProducts = db.get('sessions').find({ id : sessionId }).get('cart').value();
    const products = [];
    let total = 0;
    for (const key in listIdProducts) {
        const getProduct = db.get('products').find({ id: key }).value();
        if (getProduct) {
            const product = {
                id: key,
                name: getProduct.name,
                price: parseFloat(getProduct.price.split('').slice(1).join('')),
                description: getProduct.description,
                amount: listIdProducts[key],
                intoMoney: listIdProducts[key] * parseFloat(getProduct.price.split('').slice(1).join('')).toFixed(2)
            }
            total += product.intoMoney;
            products.push(product);
        }
    }
    res.render('cart', { products, total: parseFloat(total.toFixed(2)) });
}

const deleteCart = (req, res, next) => {
    const productId = req.params.productId;
    const sessionId = req.signedCookies.sessionId;
    db.get('sessions').find({ id: sessionId }).get('cart').unset(productId).write();
    res.redirect('/cart');
}

module.exports = {
    addToCart,
    getCart,
    deleteCart
};