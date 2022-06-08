const mongoose = require('mongoose');

const requests = new mongoose.Schema({
    requestDeveloperName: {
        type: String,
        trim: true
    },
    requestNodeName: {
        type: String,
        trim: true
    },
    connection: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    user_agent: {
        type: String,
        required: true,
    },
    ip_address: {
        type: String,
        required: true,
    },
    requestUrl: {
        type: String,
        required: true,
    },
    authToken: {
        type: String,
    },
    requestDevId: {
        type: mongoose.Types.ObjectId,
        ref: 'devloper'
    },
    date: {
        type: String,
    },
})
const MyRequest = mongoose.model('request', requests);

module.exports = {
    MyRequest
}