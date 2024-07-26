const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


const upload = multer({dest: 'uploads/'});


const Post = require('../models/post');
//to get all posts
router.get('/', (req,res,next) => {
    Post.find()
    .select('name postContent _id postImage')
    .exec()
    .then(docs => {
        const response = { 
            count: docs.length,
            posts: docs.map(doc =>{
                return{
                    name: doc.name,
                    postContent: doc.postContent,
                    postImage: doc.postImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/posts/' + doc._id
                    }
                }
            }

            )
        };
        if (docs.length>=0){
            res.status(200).json(response);
        } else{
            res.status(404).json({
                message: 'No posts found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',  checkAuth, upload.single('postImage'), (req,res,next) => {
    console.log(req.file); 
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        postContent: req.body.postContent,
        postImage: req.file.path
    });
    post.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Crested post successfully!',
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
        res.status(500).json({
            error: err
        });

    });
});

router.get('/:postID', (req,res,next) => {
    const id = req.params.postID;
    Post.findById(id)
    .select('name postContent _id postImage')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                post: doc,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://locathost:3000/posts'
                }
            });
        } else{
            req.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

});

router.patch('/:postID',checkAuth, (req,res,next) => {
    const id = req.params.postID;
    const uppostContentOps = {};
    for(const ops of req.body) {
        uppostContentOps[ops.propName] = ops.value;
    }
    Post.uppostContentOne({_id: id}, { $set: uppostContentOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Post uppostContentd!',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/posts/' + id
            }
        });
    })
    .catch( err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.delete('/:postID',checkAuth, (req,res,next) => {
    const id = req.params.postID;
    Post.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Post deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/posts',
                body: {name:'String', postContent: 'String'}
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

module.exports = router;