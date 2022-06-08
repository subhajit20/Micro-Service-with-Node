const mongoose = require('mongoose');

const nodes = new mongoose.Schema({
    devname: {
        type: String,
        required: true,
        trim: true
    },
    nodename: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        require: true
    },
    authId: {
        type: mongoose.Types.ObjectId,
        ref: "auth"
    }
})

const MyNodes = mongoose.model('devloper', nodes);

module.exports = {
    MyNodes
}