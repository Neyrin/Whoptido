
const fetch = require('node-fetch');
const beerURI = `https://sandbox-api.brewerydb.com/v2/beer/random?key=${process.env.API_KEY}`;
const logger = require('../logger');

module.exports = (controller) => {
    controller.hears('Gimme a beer', 'direct_message,direct_mention', (bot, message) => {
        bot.startConversation(message, conversationExample);
    });
    const conversationExample = (res, convo) => {
        convo.ask('Are you over 18?', async (res, convo) => {
            //convo.say('Let me check');
            const text = res.text;
            console.log(text);
            
            //const beerName = randomBeer.data.name;
            try {
                const r = await fetch(`${beerURI}`);
                
                if (r.status !== 200) {
                    throw new Error(r.statusText);
                }

                const beer = await r.json();
                console.log(beer)                 
                const {
                    name
                } = beer.data;
                convo.setVar('currentBeer', beer.data);

                convo.say(`Why don't you have a ${name}?`);
                convo.next();
            } catch (err) {
                logger.error(err);
                convo.say(`Oops. Couldn't find anything :(`);
                convo.next();
            }
        });
    }


// module.exports = (controller) => {
//     controller.hears('start convo', 'direct_message,direct_mention', (bot, message) => {
//         bot.startConversation(message, conversationExample);
//     });
//     const conversationExample = (res, convo) => {
//         convo.ask('What do you want to say', (res, convo) => {
//             const text = res.text;

//             convo.say('Random words');
//             nextStep(res, convo);
//             convo.next();
//         });
//     }
//     const nextStep = (res, convo) => {
//         convo.addQuestion('And then?', (res, convo) => {
//             convo.say('Later dude');
//             convo.next();
//         });
//     }
 }