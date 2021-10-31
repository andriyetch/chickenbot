import pkg from 'discord.js';
const { Client, Intents } = pkg;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
import config from './config.json';
import * as util from './utilities/functions.js';
import buildLogger from './utilities/build-logger.js';
import cron from 'node-cron';

var logger = buildLogger();

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content.slice(0,1) == '!') {
        message.suppressEmbeds();
        util.handleCommand(message);
    }
});

cron.schedule(`5 0 * * *`, () => {
    console.log(`Logger in index.js has been rebuilt for current date: ${util.getDateString()}`);
    logger = buildLogger();
});

client.login(config.token);

