const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Message', Message);
