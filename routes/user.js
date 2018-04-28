const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User models
const User = require('../models/User');

// User list
userRouter.get('/', (req, res, next) => {
	const promise = User.aggregate([
		{
			$lookup: {
				from: 'posts',
				localField: '_id',
				foreignField: 'user_id',
				as: 'posts'
			}
		},
		{
			$unwind: {
				path: '$posts',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					username: '$username',
					password: '$password',
					eMail: '$eMail',
					name: '$name',
					surname: '$surname',
				},
				posts: {
					$push: '$posts'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				username: '$username',
				posts: '$posts'
			}
		}

	]);
	

    promise.then((users) => {
        res.json(users);
    }).catch((err) => {
        res.json(err);
    })
});


// User id
userRouter.get('/:user_id', (req, res, next) => {
    const promise = User.findById( { _id: mongoose.Types.ObjectId(req.params.user_id) } );
    promise.then((user) => {
        if(!user)
            next({message: 'The user was not found.'});
        res.json(user);
    }).catch((err) => {
        res.json(err);
    });
});


// User create
userRouter.post('/', (req, res, next) => {
	const { username, password, eMail, name, surname } = req.body;

	bcrypt.hash(password, 10).then((hash) => {
		const user = new User({
			username,
			password: hash,
			eMail, 
			name, 
			surname
		});

		const promise = user.save();
		promise.then((userData) => {
			res.json(userData)
		}).catch((err) => {
			res.json(err);
		});
	});
});

// User update
userRouter.put('/:user_id', (req, res, next) => {
	const promise = User.findByIdAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.params.user_id) },
		req.body,
		{
			new: true
		}
	);

	promise.then((userUpdate) => {
		if (!userUpdate)
			next({ message: 'The user was not found.'});

		res.json(userUpdate);
	}).catch((err) => {
		res.json(err);
	});
});

// User delete BUGS
userRouter.delete('/:user_id', (req, res, next) => {
	const promise = User.findByIdAndRemove( {_id: mongoose.Types.ObjectId(req.params.user_id) } );
	promise.then((userDelete) => {
		if(!userDelete)
			next({message: 'The user was not found.'});
		res.json({status: 'User deleted'});
	}).catch((err) => {
		res.json(err);
	});
});

module.exports = userRouter;