const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const ContactSchema = new Schema({
    user: Schema.Types.ObjectId,//employee to whome this belong to
    name: {
        type: String,
        required: [true,'name is a required field.']
    },
    email: {
        type: String,
        required: [true, 'email is a required field.'],
        unique: true
    },
    group: {
        type: String,
        default: 'None',
    },
    phone: {
        type: Number,
        minlength: 10
    },
    //social accounts,
    starred: Boolean,
    active: Boolean,
})

module.exports = Mongoose.model('Contact', ContactSchema)