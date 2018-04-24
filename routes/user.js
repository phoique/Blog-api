const express = require('express');
const userRooter = express.Router();

userRooter.get('/', (req, res) => {
    res.send('user');
});

module.exports = userRooter;