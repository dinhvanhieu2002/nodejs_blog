const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema(
    {
        username: { type: String, maxlength: 255 },
        email: { type: String, maxlength: 600 },
        password: { type: String, maxlength: 255 },
    },
    {
        timestamps: true,
    },
);

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
});

module.exports = mongoose.model('User', User);
