const mongoose = require('mongoose');

const auths = new mongoose.Schema({
    auth_token: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        require: true
    },
    devId: {
        type: mongoose.Types.ObjectId,
        ref: "devloper"
    },
})
const MyAuth = mongoose.model('auth', auths);

module.exports = {
    MyAuth
}