const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    postContent: {type: String, required: true},
    postImage: {type: String, required: true},
    user: {type: String, required:true}
});

module.exports = mongoose.model('Post', postSchema);