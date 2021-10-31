function run (message) {
    message.channel.send(`Available commands:\n\`\`\`yaml\n${str}\`\`\``);
    return;
}

var str = `
!pdf: Returns a given link as a PDF
!mp3: Returns an mp3 from a given YouTube link
!feed: Feeds the Chicken
!commands: You know what this does already
`

export default {run}