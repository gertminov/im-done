const Channels = require('pusher');

const {
    APP_ID: appId,
    KEY: key,
    SECRET: secret,
    CLUSTER: cluster,
} = process.env;

const channels = new Channels({
    appId,
    key,
    secret,
    cluster,
});

module.exports = async (req, res) => {
    const socketID = req.body.socket_id;
    const channelName = req.body.channel_name;


    const authResponse = channels.authorizeChannel(socketID, channelName);
    res.send(authResponse)
};
