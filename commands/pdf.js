import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import * as util from '../utilities/functions.js';
import config from '../config.json'
import buildLogger from '../utilities/build-logger.js';

async function run(message) {
    var logger = buildLogger();
    var args = message.content.split(' ');

    logger.warn(typeof args[1])
    if (!util.validator.isURL(args[1]) && args[1] != 'login') return message.channel.send("Usage: `!pdf https://www.chegg.com/answerpagelink`");
    else if (args[1] == 'login' && util.validator.isURL(args[2])) {
        message.channel.send('Opening browser to specified page. Please login to your account using your credentials, then close the window');
        login(args[2]).then(() => {
            logger.warn('Browser opened successfully')
        }).catch ((err) => {logger.error(err)})
        return
    }
    
    util.checkingLink(message);

    logger.info();
    logger.info('====PAGE TO PDF V2====');
    var msgRef = await message.channel.send('```\n====PAGE TO PDF V2====\n```');

    //logger.warn(msgRef.content);
    logger.info();

    puppet(args[1], msgRef, logger).then(async (msgRef) => {
        message.channel.send({
            files: ['./pdfs/chegg.pdf']
        });
        logger.info(`PDF sent in discord`);
        await util.sleep(7)
        msgRef.delete();
    })
    .catch((err) => {
        logger.error(`Some error occurred trying to convert ${args[1]} to PDF`);
        logger.error(err);
    })        
}

function login (url) {
    return new Promise (async (resolve,reject) => {
        try {
            const browser = await puppeteer.launch({
                executablePath: config.browser_path,
                headless: false,
                userDataDir: 'C:/userData'
            });

            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'domcontentloaded' })

            resolve(`Page opened to ${url}`)
        } catch (error) {
            reject(error)
        } 
        

    })
}

function puppet(url, msgRef, logger) {
    return new Promise(async (resolve, reject) => {

        const browser = await puppeteer.launch({
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            headless: true,
            slowMo: 250,
            userDataDir: 'C:/userData'
        });

        msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + "Starting browser process\n```")

        try {
            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            
            await page.pdf({ path: 'pdfs/chegg.pdf', format: 'a4' });
    
            await logger.info('PDF created in answers directory');
            msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + 'PDF created in answers directory\n```');

            await logger.info(`Closing browser process...`);
            await util.sleep(0.5);
            await browser.close();
            
            await logger.info(`Browser process closed`);
            msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + 'Browser process closed\n```');
            resolve(msgRef)
        } catch (error) {
            reject(error)
        }
    })
}

export default {run}