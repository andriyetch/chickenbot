const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');
const cheggbot = require('./cheggbot/pagetopdf.js');
const buildLogger = require('./utilities/build-logger');
const cron = require('node-cron');
const Functions = require('./utilities/functions');

const service = new Functions;
var logger = buildLogger();

cron.schedule(`5 0 * * *`, () => {
    logger = buildLogger();
    logger.warn(`Logger has been rebuilt for current date: ${service.getDateString()}`);
});

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {

    service.chickenOG(message);
    
    if (message.content.slice(0,1) == '!') {
        var args = message.content.split(' ');
        args[0] = args[0].substring(1);

        switch (args[0]) {
            case 'pdf': 
                if (args[1]) {
                    service.checkingLink(message);
                    try {
                        cheggbot.run(args[1]).then((value) => {
                            if (value) {
                                message.channel.send({
                                    files: ['./cheggbot/answers/chegg.pdf']
                                });
                                logger.info(`PDF sent in discord`);
                            } else message.channel.send("Something's fucked up, try again and double check you're pasting the full link including `https://`");
                        })
                    } catch (error) {
                        
                    }
                }
                break;
            case 'chegg':
                message.channel.send("You goofy motherfucker, use !pdf instead of !chegg");
                break;
            case 'logs': 
                message.channel.send("chill out for a sec I can't do that yet sheesh");
                break;
            case 'feed':
                message.channel.send("Mmmmm");
                break;
        }
    }

});

client.login(token);

