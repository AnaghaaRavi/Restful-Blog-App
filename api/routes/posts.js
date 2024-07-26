const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const upload = multer({ dest: 'uploads/' });

const Post = require('../models/post');

// Get all posts
router.get('/', (req, res, next) => {
    Post.find()
        .select('name postContent _id postImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                posts: docs.map(doc => {
                    return {
                        name: doc.name,
                        postContent: doc.postContent,
                        postImage: doc.postImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/posts/' + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Create a post
router.post('/', checkAuth, upload.single('postImage'), (req, res, next) => {
    console.log(req.file);
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        postContent: req.body.postContent,
        postImage: req.file.path,
        user: req.userEmail
    });
    post.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created post successfully!',
                createdPost: {
                    name: result.name,
                    postContent: result.postContent,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/posts/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Get a specific post
router.get('/:postID', (req, res, next) => {
    const id = req.params.postID;
    Post.findById(id)
        .select('name postContent _id postImage')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    post: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all posts',
                        url: 'http://localhost:3000/posts'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Update a post with PUT
router.put('/:postID', checkAuth, upload.single('postImage'), (req, res, next) => {
    const id = req.params.postID;

    const updateOps = {
        name: req.body.name,
        postContent: req.body.postContent
    };

    if (req.file) {
        updateOps.postImage = req.file.path;
    }

    Post.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Post updated!',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/posts/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Delete a post
router.delete('/:postID', checkAuth, (req, res, next) => {
    const id = req.params.postID;
    Post.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Post deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/posts',
                    body: { name: 'String', postContent: 'String' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status  .json({ error: err });
        });
});

module.exports = router;

