const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/blogApi');

    mongoose.connection.on('open', () => {
        console.log('Mongodb Connected');
    });

    mongoose.connection.on('error', (error) => {
        console.log('Mongodb error: '+error);
    });

    //mongoose.Promise = global.Promise;
}