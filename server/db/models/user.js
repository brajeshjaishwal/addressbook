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
        required: [true, 'password is a required field'],
        minlength: 8
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                //return /\d{3}-\d{3}-\d{4}/.test(v);
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'phone number is a required field']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('User', UserSchema)