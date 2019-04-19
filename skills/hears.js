const logger = require('../logger');

module.exports = (controller) => {
    controller.hears(['hello', 'hey', 'yo'], 'direct_message,direct_mention', (bot, message) => {
        //bot.reply(message, ' Hello!');
        bot.api.users.info({
            user: message.user
        }, (err,res) => {
            if (err) {
                logger.error(err);
            }
            const { real_name } = res.user;
            bot.reply(message, `${message.text} ${real_name}`);
        });
    });
    controller.hears(['^say (.*)'], 'driect_message,direct_mention', (bot, message) => {
        if (message.match[1]) {
            bot.reply(message, message.match[1]);
        }
    });
    controller.hears('test webhook', 'direct_message', (bot, message) => {
        bot.sendWebhook({
            text: `I'm replying through a webhook`
        }, (err, res) => {
            if (err) {
                logger.error(err);
            }
        })
    });
}
