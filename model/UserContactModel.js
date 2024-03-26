const mongoose = require('mongoose');

const UserContactSchema = new mongoose.Schema({ 
    user_uid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    user_flat: {
        type: String,
        required: true,
    },
    user_tower: {
        type: String,
        required: true,
    },
    user_society: {
        type: String,
        required: true,
    },
    user_mobile: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('UserContact', UserContactSchema, 'UserContact');