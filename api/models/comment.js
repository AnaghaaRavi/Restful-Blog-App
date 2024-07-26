const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},//post id is made required to ensure which comment is added to which post
    content: {type: String, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);