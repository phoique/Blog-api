const express = require('express');
const postRooter = express.Router();

// Post models
const Post = require('../models/Post');

// post list
postRooter.get('/', (req, res, next) => {
    const promise = Post.find();
    promise.then((posts) => {
        res.json(posts);
    }).catch((err) => {
        res.json(err);
    })
});


// post id
postRooter.get('/:post_id', (req,res,next) => {
    const promise = Post.findById(req.params.post_id);
    promise.then((post) => {
        if(!post)
            next({message: 'The post was not found.'});
        res.json(post)
    }).catch((err) => {
        res.json(err)
    });
});

/*Post category list
postRooter.get('/:category', (req,res,next) => {
    const promise = Post.find();
    promise.then((posts) => {
        if(!post)
            next({message: 'The post was not found.'});
        res.json(posts);
    }).catch((err) => {
        res.json(err);
    })
});
*/

// Post create
postRooter.post('/', (req,res, next) => {
    const post = new Post(req.body);
    const promise = post.save();

    promise.then((postData) => {
        res.json(postData); 
    }).catch((err) => {
        res.json(err);
    })

});

// Post update
postRooter.put('/:post_id', (req,res,next) =>{
    const promise = Post.findByIdAndUpdate(
        req.params.post_id,
        req.body,
        {
            new:true
        }
    );

    promise.then((newPostData) =>{
        if(!newPostData)
            next({message: 'The post was not found.'});

        res.json(newPostData);
    }).catch((err) => {
        res.json(err);
    });
});

// Post delete
postRooter.delete('/:post_id', (req,res,next) => {
    const promise = Post.findByIdAndRemove(req.params.post_id);
    promise.then((deletePost) => {
        if(!deletePost)
            next({message: 'The post was not found.'});
        res.json({status: 'Post deleted'});
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = postRooter;