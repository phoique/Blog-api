const express = require('express');
const postRouter = express.Router();
const mongoose = require('mongoose');

// Post models
const Post = require('../models/Post');

// post list
postRouter.get('/', (req, res, next) => {
    const promise = Post.aggregate([
		{
			$lookup: {
				from: 'users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'user'
			}
		},
		{
			$unwind: '$user'
		}
	]);

    promise.then((posts) => {
        res.json(posts);
    }).catch((err) => {
        res.json(err);
    });

});


// post id
postRouter.get('/:post_id', (req,res,next) => {
    const promise = Post.findById( { _id: mongoose.Types.ObjectId(req.params.post_id) } );
    promise.then((post) => {
        if(!post)
            next({message: 'The post was not found.'});
        res.json(post);
    }).catch((err) => {
        res.json(err);
    });
});

/*Post category list
postRouter.get('/:category', (req,res,next) => {
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
postRouter.post('/', (req,res, next) => {
    const post = new Post(req.body);
    const promise = post.save();

    promise.then((postData) => {
        res.json(postData); 
    }).catch((err) => {
        res.json(err);
    })

});

// Post update
postRouter.put('/:post_id', (req,res,next) => {
    const promise = Post.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.post_id) },
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

// Post delete BUGS
postRouter.delete('/:post_id', (req,res,next) => {
    const promise = Post.findByIdAndRemove( { _id: mongoose.Types.ObjectId(req.params.post_id) } );
    promise.then((deletePost) => {
        if(!deletePost)
            next({message: 'The post was not found.'});
        res.json({status: 'Post deleted'});
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = postRouter;