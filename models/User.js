const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        unique: [true, 'Böyle bir kullanıcı adı mevcuttur.'],
        maxlength: [15, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır '],
        minlength: [5, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
    },
    password: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [30, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır '],
        minlength: [8, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
    }
});

module.exports = mongoose.model('user', userSchema);