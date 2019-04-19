require('dotenv').config();
const logger = require('./logger');
const Botkit = require('botkit');

console.log(process.env.NODE_ENV);

logger.info('This is sent to a combined.log file');

[
    'NODE_ENV',
    'CLIENT_ID',
    'CLIENT_SIGNING_SECRET',
    'VERIFICATION_TOKEN',
    'BOT_TOKEN'
].forEach(name => {
    if (!process.env[name]){
        const msg = `Environment variable${name} is missing`;
        logger.error(msg);
        throw new Error(msg);
    }
});

const controller = Botkit.slackbot({
    json_file_store: './db_slackbutton_slash_command/',
    debug: process.env.NODE_ENV === 'production' ? 'false' : 'true',
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET
});

controller.configureSlackApp({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
    scopes: [
        'commands', 
        'bot', 
        'chat:write:bot', 
        'channels:read', 
        'im:read', 
        'incoming-webhook'
    ]
});

const bot = controller.spawn({
    token: process.env.BOT_TOKEN,
    incoming_webhook: {
        url: 'https://hooks.slack.com/services/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'
    }
}).startRTM();

const PORT = process.env.PORT || 3000;
controller.setupWebserver(PORT, (err, webserver) => {
    controller.createOauthEndpoints(controller.webserver, 
        (err, req, res) => {
            if (err) {
                logger.error(err);
                res.status(500).sen(`Error : ${err}`);
            }
            res.send('Connected to Slack');
        });
});

const hears = require('./skills/hears');
const convo = require('./skills/convo');
hears(controller);
convo(controller);
