import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import * as util from '../utilities/functions.js';
import buildLogger from '../utilities/build-logger.js';

function run(message) {
    var logger = buildLogger();

    var url = message.content.split(' ')[1];
    if (!util.validator.isURL(url)) return message.channel.send("Usage: `!pdf https://www.chegg.com/answerpagelink`");
    
    util.checkingLink(message);

    logger.info();
    logger.info('====PAGE TO PDF V2====');
    logger.info();

    puppet(url, logger).then(() => {
        message.channel.send({
            files: ['./pdfs/chegg.pdf']
        });
        logger.info(`PDF sent in discord`);
    })
    .catch((err) => {
        logger.error(`Some error occurred trying to convert ${url} to PDF`);
        logger.error(err);
    })        
}

function puppet(url, logger) {
    return new Promise(async (resolve, reject) => {

        const browser = await puppeteer.launch({
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            headless: true,
            slowMo: 250,
            userDataDir: 'C:/userData'
        });
//C:/Users/andri/AppData/Local/Google/Chrome/User Data
        try {
            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'domcontentloaded' })
            
            await page.pdf({ path: 'pdfs/chegg.pdf', format: 'a4' });
    
            await logger.info(`PDF created in answers directory`);
    
            await logger.info(`Closing browser process...`)
            await util.sleep(1);
            await browser.close()
            
            await logger.info(`Browser process closed`);
            resolve()
        } catch (error) {
            reject(error)
        }
        
    })

}

export default {run}