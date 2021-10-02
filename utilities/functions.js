import buildLogger from '../utilities/build-logger.js';
import commands from '../commands/index.js';
import cron from 'node-cron';

var logger = buildLogger();

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

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function handleCommand(message) {
    var args = message.content.split(' ');
    args[0] = args[0].substring(1);
    
    switch (args[0]) {
        case 'pdf': commands.pdf.run(message, args[1]);
            break;
        case 'chegg': commands.chegg.run(message);
            break;
        case 'logs': commands.logs.run(message);
            break;
        case 'feed': commands.feed.run(message);
            break;
        case 'commands': commands.commands.run(message);
    }
}

function checkingLink(message) {
    var responses = [
        "Working on your request...",
        "Chegging your link...", 
        "\*Chicken noises\*",
        "Let me chegg on that for ya...",
        "I gotchu, one sec..."
    ]
    message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
}

async function chickenOG(message) {
    logger.warn("CHICKEN OG");
    if (message.content.toLowerCase().includes('chickenbot')) {
        message.channel.send("Heard you were talkin shit...");
        await this.sleep(6);
        message.channel.send("Best remember who runs these streets cuh");
    }
}

cron.schedule(`5 0 * * *`, () => {
    console.log(`functions.js has been rebuilt for current date: ${util.getDateString()}`);
    logger = buildLogger();
});

export {getDateString, sleep, randomIntFromInterval, handleCommand, checkingLink, chickenOG}