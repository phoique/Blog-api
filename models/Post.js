const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    title: {
        type:String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [30, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır '],
        minlength: [3, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
    },
    content: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        minlength: [5, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
    },
    category: {
        type:String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [15, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır '],
        minlength: [3, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', postSchema);