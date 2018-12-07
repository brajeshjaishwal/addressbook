const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const UserSchema = new Schema({
    
    name: {
        type: String,
        required: [true, 'name is a required field']
    },
    email: {
        type: String,
        required: [true, 'email is a required field'],
        unique: [true, 'this email is already in use'],
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'password is a required field'],
    },
    phone: {
        type: Number,
        minlength: 10,
        required: [true, 'phone number is a required field']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('User', UserSchema)