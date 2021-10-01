class Functions {
    constructor() {

    }

    getDateString() {
        var currentDate = new Date();
        var m = (currentDate.getMonth() + 1).toString();
        var d = (currentDate.getDate()).toString();
        var y = (currentDate.getFullYear()).toString();

        if (m.length == 1) m = "0" + m;
        if (d.length == 1) d = "0" + d;
        
        return `${m}/${d}/${y}`
    }

    sleep(seconds) {
        var ms = seconds*1000;
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    handleCommand(message) {
        
    }

    checkingLink(message) {
        var responses = [
            "Working on your request...",
            "Chegging your link...", 
            "\*Chicken noises\*",
            "Let me chegg on that for ya...",
            "I gotchu, one sec..."
        ]
        message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
    }

    async chickenOG(message) {
        if (message.content.toLowerCase().includes('chickenbot')) {
            message.channel.send("Heard you were talkin shit...");
            await this.sleep(6);
            message.channel.send("Best remember who runs these streets cuh");
        }
    }

}

module.exports = Functions;