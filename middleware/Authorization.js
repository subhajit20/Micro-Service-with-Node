const { MyAuth } = require('../schemas/auth_schema');
const { MyRequest } = require('../schemas/request_schema');
const ip = require('ip');


async function Auth(req, res, next) {
    const myToken = req.headers.authorization;
    req.MyAuthId = myToken;
    const checkhAuth = await MyAuth.find({ auth_token: myToken });
    const i = ip.address();
    if (!checkhAuth) {
        res.status(404).json({
            error: {
                msg: "You should have a Authorization Key..1"
            }
        })
    } else {
        const isIp = await MyRequest.find({ authToken: myToken });
        if (isIp) {
            if (isIp[0].ip_address === i) {
                next()
            } else {
                res.status(450).json({
                    error: {
                        msg: 'Your Authorization key and Ip address are matched...'
                    }
                })
            }
        } else {
            res.status(460).json({
                error: {
                    msg: 'Your Authorization key and Ip address are matched...'
                }
            })
        }
    }
}

module.exports = {
    Auth
}