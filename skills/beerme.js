module.exports = (controller) => {
    controller.hears('Gimme a beer', 'direct_message,direct_mention', (bot, message) => {
        bot.startConversation(message, conversationExample);
    });
    const conversationExample = (res, convo) => {
        convo.ask('Are you over 18?', (res, convo) => {
            const text = res.text;

            convo.say('Random words');
            nextStep(res, convo);
            convo.next();
        });
    }



    // const conversationExample = (res, convo) => {
    //     convo.ask('What do you want to say', (res, convo) => {
    //         const text = res.text;

    //         convo.say('Random words');
    //         nextStep(res, convo);
    //         convo.next();
    //     });
    // }
    // const nextStep = (res, convo) => {
    //     convo.addQuestion('And then?', (res, convo) => {
    //         convo.say('Later dude');
    //         convo.next();
    //     });
    // }
}