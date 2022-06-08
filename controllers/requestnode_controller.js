const { v4 } = require('uuid')
const { v4: uuidv4 } = require('uuid');
const { MyNodes } = require('../schemas/developer_schema');
const { MyAuth } = require('../schemas/auth_schema');
const { MyRequest } = require('../schemas/request_schema');
const ip = require('ip');
const dayjs = require('dayjs');


/* creating node */
async function request_controller(req, res) {
    const { devname, nodename } = req.params;
    if (devname.length <= 3 || nodename.length <= 3) {
        res.status(404).json({
            error: {
                msg: "Name is too sort..."
            }
        })
    } else {
        const token = v4();
        var now = dayjs()
        var formatted = now.format()
        const newNode = new MyNodes({ devname: devname, nodename: nodename, date: now.format() });
        newNode.save();

        const newAuth = new MyAuth({ auth_token: token, devId: newNode, date: now.format() });
        newAuth.save();

        const i = ip.address()

        const newDev = await MyNodes.updateOne({ _id: newNode._id }, {
            $set: {
                authId: newAuth._id
            }
        })

        const requestInfo = new MyRequest({ requestDeveloperName: newNode.devname, requestNodeName: newNode.nodename, connection: req.headers.connection, platform: req.headers['sec-ch-ua-platform'], user_agent: req.headers['user-agent'], ip_address: i, requestUrl: req.originalUrl, requestDevId: newNode.devId, authToken: newAuth.auth_token, date: now.format() })
        requestInfo.save();


        res.status(200).json({
            'Developer-Name': newNode.devname,
            'Node-Name': newNode.nodename,
            'Athorization-Token': newAuth.auth_token
        })
    }
}

/* authorization demo request */
async function getRequestInfo(req, res) {
    try {
        // const requestInfo = new MyRequest({ requestDeveloperName: devName.devname, requestNodeName: devName.nodename, connection: req.headers.connection, platform: req.headers['sec-ch-ua-platform'], user_agent: req.headers['user-agent'], ip_address: i, requestUrl: req.originalUrl, date: now.format() })
        // requestInfo.save();
        res.status(200).json({
            error: {
                msg: 'Succesfully...'
            }
        })
    } catch (err) {
        res.status(500).json({
            error: {
                msg: 'Your Authorization key and Ip address are matched...'
            }
        })
    }
}

module.exports = {
    request_controller, getRequestInfo
}