const Session = require('../models/session.model');
const Product = require('../models/product.model')
const addToCart = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const userId = req.signedCookies.userId;
        const session = await Session.findOne({ userId: userId }).lean();
        console.log("session",session);
        let findProduct = false;
        console.log(session.cart);
        await session.cart.map((item) => { 
            if (productId in item)
                findProduct = true;
            return item;
        });
        if( !findProduct) {
            session.cart.push({ [productId]: 1 });
        } else {
            session.cart.map(item => {
                if (productId in item) {
                    item[productId] ++; 
                }
                return item;
            });
        }
        const update = await Session.updateOne({ _id: session._id }, session);
        return res.redirect('/products');
    } catch (e) {
        next(e);
    }
}

const getCart = async (req, res, next) => {
    try {
        const userId = req.signedCookies.userId;
        const listIdProducts = await Session.findOne({ userId }).lean();
        const products = [];
        let total = 0;
        for (const item of listIdProducts.cart) {
            for(const keys in item) {
                const getProduct = await Product.findOne( { _id: keys }).lean();
                if (getProduct) {
                    const product = {
                        id: keys,
                        name: getProduct.name,
                        price: getProduct.price,
                        description: getProduct.description,
                        image: getProduct.image,
                        amount: item[keys],
                        intoMoney: getProduct.price * item[keys]
                    }
                    total += product.intoMoney;
                    products.push(product);
                }
            }
        }
        res.render('cart', { products, total: parseFloat(total.toFixed(2)) });
    } catch (e) {
        next(e);
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const userId = req.signedCookies.userId;
        const session = await Session.findOne({ userId }).lean();
        session.cart.map((item,index) => {
            if (productId in item) {
                session.cart.splice();
                return;
            }
            else {
                return item;
            }
        });
        await Session.updateOne({ userId }, session);
        res.redirect('/cart');
    } catch (e) {
        next(e)
    }   
}

module.exports = {
    addToCart,
    getCart,
    deleteCart
};