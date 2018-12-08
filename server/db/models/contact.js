const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true,'name is a required field.']
    },
    email: {
        type: String,
        required: [true, 'email is a required field.'],
        unique: [true, 'this email already exist']
    },
    phone: {
        type: Number,
        minlength: 10
    },
    //social accounts e.g. facebook, linkedin and etc.
    photo: String,              //photo url
    starred: Boolean,           //important
    active: Boolean,            //active/inactive
    user: Schema.Types.ObjectId,//which user this belongs to
    group: Schema.Types.ObjectId,//which group this belongs to
})

module.exports = Mongoose.model('Contact', ContactSchema)