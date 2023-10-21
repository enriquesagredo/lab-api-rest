const { stringify } = require('mocha/lib/utils')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema(

{
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [3, "Should have at least 3 characters"]
    },

    bio: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, "Should have at least 3 characters"],
        maxLength: [300, "Should have less than 300 characters"],
    },

     century: {
        type: Number,
        required: true,
    },

    genres:{
        type: Array,
        required: true,
    }
}
)
const Author = mongoose.model("Author", authorSchema);
module.exports = Author