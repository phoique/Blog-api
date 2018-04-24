const express = require('express');
const postRooter = express.Router();

// post list
postRooter.get('/', (req, res) => {
    res.send('post');
});

module.exports = postRooter;