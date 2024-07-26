const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Comment = require('../models/comment');
const Post = require('../models/post');



router.get('/', checkAuth, (req, res, next) => {
    Comment.find()
    .select('post content _id')
    .populate('post','name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            comments: docs.map(doc => {
                 return{
                    _id: doc._id,
                    post: doc.post,
                    content: doc.content,
                    request: {
                        tye: 'GET',
                        url: 'http://localhost:3000/comments/' + doc._id
                    }
                 }
            })
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });

});

router.post('/',checkAuth, (req, res, next) => {
    Post.findById(req.body.postId)
        .then(post =>{
            if (!post){
                return res.status(404).json({
                    message: 'Post not found'
                })
            }
        }
        )
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content,
        post: req.body.postId
    });
    return comment.save()
    
});

router.get('/:commentId', checkAuth, (req, res, next) => {
    Comment.findById(req.params.commentId)
    .populate('post')
    .exec()
    .then(comment => {
        if(!comment){
            return res.status(404).json({
                message: 'Comment not found'
            });
        }
        res.status(200).json({
            comment: comment,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/comments'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:commentId',checkAuth, (req, res, next) => {
    Comment.deleteOne({ _id: req.params.commentId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Comment deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/comments',
                body: {postId: 'ID', content: 'String'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;