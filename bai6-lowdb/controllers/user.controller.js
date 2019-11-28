const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.model');

const index = async (req, res) => {
    try {
        const users = await User.find().lean();
        return res.render('users/index', { users })
            .status(200).json('get_listuser_successfully');
    } catch (e) {
        next(e);
    }
}

const create = (req, res) => res.render('users/create');

const search = async (req, res) => {
    try {
        const username = req.query.username;
        const matchedUsers = await User.find().lean() 
        const users = matchedUsers.filter(( user ) => user.name.toLowerCase().indexOf(username.toLowerCase()) !== -1);
        return res.render('users/index', { users , username });
    } catch (e) {
        next(e);
    }
    
};

const postCreate = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync('10');
        const data = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        }
        const user = await User.create(data);
        return res.redirect('/users')
            .status(200).json('create_user_successfully');    
    } catch (e) {
        next(e);
    }
    
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id }).lean();
        res.render('users/user', { user })
        .status(200).json('get_listuser_successfully');
        return; 
    } catch (e) {
        next(e);
    }
};

module.exports = {
    index,
    create,
    search,
    postCreate,
    getUser
}