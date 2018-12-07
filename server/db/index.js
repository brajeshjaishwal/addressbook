const Mongoose = require('mongoose')
const User = require('./models/user')
const Contact = require('./models/contact')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET, DBURL } = require('../config/config').config

const Connect = function() {
    Mongoose.Promise = global.Promise
    try {
        Mongoose.connect(DBURL, { useNewUrlParser: true }).then(() => {
            console.log('database is running ...')
        }).catch((err) => {
            console.log(`error: ${err} occurred while connecting to database.`)
        });
    }catch(Error) {
        throw Error
    }
}

const createToken = async (user) => {
    //const { name, _id } = user
    let token = await jwt.sign({ user }, SECRET, {expiresIn: '10hr'})
    return token
};

const GetCurrentUser = async (token) => {
    let user = null
    try{
        if(token === null || token === 'null' || token === undefined || token === '') {
            console.log('we dont have any token yet. lets wait.')
        }
        else{
            const result = await jwt.verify(token, SECRET)
            if(result)
                user = result.user
        }
    }catch(err) {
        console.log(err)
    }
    return user
}

const Register = async function({name, email, phone, password}) {

    try {
        const user = await User.findOne({name});
        if (user) {
            throw new Error('User already exists');
        }
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)
        const newUser = await new User({name, email, phone, password: hash}).save();
        let token = await createToken(newUser);
        return {user: newUser, token}
    }catch(Error) {
        throw Error
    }
}

const Login = async function({email, password}) {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('User not found');
        };
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password')
        }
        const token = await createToken(user)
        return { user, token }
    }catch(Error) {
        throw Error
    }
}

const GetContacts = async function({user, group}) {
    try{
        const parentid = parent !== "-1" ? parent : null;
        const contacts = await Contact.find({user, group})
        return { contacts }
    }catch(Error) {
        throw Error
    }
}

const AddContact = async function({user, name, email }) {
    try{
        const temp = await new Contact({ user, name, email }).save();
        return { contact: temp }
    }catch(Error) {
        throw Error
    }
}

const EditContact = async function({user, contact}) {
    try {
        
    }catch(Error) {
        throw Error
    }
}

const DeleteContact = async function({user, contact}) {
    try {
        const temp = await Contact.findOneAndRemove({contact})
        return { contact: temp}
    }catch(Error) {
        throw Error
    }
}

module.exports = {  Connect, Login, Register, GetContacts, 
                    AddContact, EditContact, DeleteContact,
                    GetCurrentUser }
