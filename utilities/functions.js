import commands from '../commands/index.js';
import validator from 'validator';
import buildLogger from './build-logger.js';
import cron from 'node-cron';
var logger = buildLogger();

cron.schedule(`5 0 * * *`, () => {
    console.log(`Logger in functions.js has been rebuilt for current date: ${util.getDateString()}`);
    logger = buildLogger();
});

function handleCommand(message) {
    const validCommands = ['pdf', 'mp3', 'feed', 'commands'];
    const args = message.content.replace(/\s+/g,' ').trim().substring(1, message.content.length).split(' ');
    if (!validCommands.includes(args[0])) return message.channel.send("Sorry that's not a valid command!");
    logger.warn(`${message.author.tag} used !${args[0]}`)
    commands[args[0]].run(message, args);
}

function getDateString() {
    var currentDate = new Date();
    var m = (currentDate.getMonth() + 1).toString();
    var d = (currentDate.getDate()).toString();
    var y = (currentDate.getFullYear()).toString();

    if (m.length == 1) m = "0" + m;
    if (d.length == 1) d = "0" + d;
    
    return `${m}/${d}/${y}`
}

function sleep(seconds) {
    var ms = seconds*1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkingLink(message) {
    var responses = [
        "Working on your request... :chicken:",
        "Chegging your link... :chicken:", 
        ":chicken: \*Chicken noises\*  :chicken:",
        "Let me chegg on that for ya...  :chicken:",
        "I gotchu, one sec...  :chicken:"
    ]
    message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
}

export {getDateString, sleep, handleCommand, checkingLink, validator}