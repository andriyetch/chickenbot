import cheggbot from '../cheggbot/pagetopdf.js';
import * as util from '../utilities/functions.js';
import buildLogger from '../utilities/build-logger.js';

async function run(message) {
    var url = message.content.split(' ')[1];
    var logger = buildLogger();
    if (url) {
        util.checkingLink(message);
        try {
            cheggbot.run(url).then((value) => {
                if (value) {
                    message.channel.send({
                        files: ['./cheggbot/answers/chegg.pdf']
                    });
                    logger.info(`PDF sent in discord`);
                } else message.channel.send("Something's fucked up, try again and double check you're pasting the full link including `https://`");
            })
        } catch (error) {
            console.log(error);
        }
    } else message.channel.send("You need to provide a URL. For example `!pdf https://example.com`");
}

export default {run}