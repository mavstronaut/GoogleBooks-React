const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: false},
    description: {type: String, required: false},
    link: {type: String, required: false},
    thumbnail: {type: String, required: false}
});

// const bookSchema = new Schema({
//     title: {type: String, required: true},
//     link: {type: String, required: false},
//     thumbnail: {type: String, required: false},
//     author: {type: String, required: false},
//     description: {type: String, required: false},
//     key: {type: String, required: false},
//     dateSaved: { type: Date, default: Date.now }
// });

const SavedBooks = mongoose.model("SavedBooks", bookSchema);

module.exports = SavedBooks;