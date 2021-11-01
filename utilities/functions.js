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

function handleCommand(message) {
    var userCommand = message.content.split(' ')[0].substring(1);
    commands[userCommand].run(message);
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