import commands from '../commands/index.js';
import validator from 'validator';

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

function canBeUsedInGeneral(command) {
    var status = {
        "pdf":false,
        "pdf2":false,
        "mp3":false,
        "feed":true,
        "commands":true
    }
    switch(status[command]) {
        case true: return true
            break
        case false: return false
            break
        default: return undefined
    }
}

function handleCommand(message) {

    var userCommand = message.content.split(' ')[0].substring(1);
    switch(canBeUsedInGeneral(userCommand)) {
        case true:      commands[userCommand].run(message);
                        break;
        case false:     if (message.channel.name == 'bot-firing-range' || message.channel.name == 'testing') commands[userCommand].run(message); 
                        else message.channel.send(message.author.toString() + " Please use this command in " + message.guild.channels.cache.get('904264306844106773').toString());
                        break;
        case undefined: message.channel.send("That's not a valid command silly");
                        break;
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

export {getDateString, sleep, randomIntFromInterval, handleCommand, checkingLink, validator}