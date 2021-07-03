const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    author: String,
    title: String,
    text: String,
    options: [
        {id: Number, title: String}
    ],
    levels: [
        {title: String, text: String, options: [
            {id: Number, title: String}
        ]}
    ],
});

module.exports = mongoose.model('Story', storySchema);