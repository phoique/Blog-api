const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Restfull Blog Api' });
});

router.post('/api/login', (req, res) => {
	const { username, password } = req.body;

	User.findOne({
		username
	}, (err, user) => {
		if (err)
			throw err;

		if(!user){
			res.json({
				status: false,
				message: 'Authentication failed, user not found.'
			});
		}else{
			bcrypt.compare(password, user.password).then((result) => {
				if (!result){
					res.json({
						status: false,
						message: 'Authentication failed, wrong password.'
					});
				}else{
					const payload = {
						username
					};
					const token = jwt.sign(payload, req.app.get('secret_key'), {
						expiresIn: 720 // 12 saat
					});

					res.json({
						status: true,
						token
					})
				}
			});
		}
	});

});

module.exports = router;
