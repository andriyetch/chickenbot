import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import * as util from '../utilities/functions.js';
import config from '../config.json'
import buildLogger from '../utilities/build-logger.js';

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';

async function run(message) {
    var logger = buildLogger();
    var args = message.content.split(' ');

    //checks if "!pdf login" command is being used
    if (!util.validator.isURL(args[1]) && args[1] != 'login') return message.channel.send("Usage: `!pdf https://www.chegg.com/answerpagelink`");
    else if (args[1] == 'login' && util.validator.isURL(args[2])) {
        message.channel.send('Opening browser to specified page. Please login to your account using your credentials, then close the window');
        login(args[2]).then(() => {
            logger.warn('Browser opened successfully')
        }).catch ((err) => {
            logger.error(err.error)
            logger.error(error.customError)
        })
        return
    }
    
    //sends "checking your link" message
    util.checkingLink(message);

    logger.info('\n\n\n====CHEGGBOT V2====\n');
    var msgRef = await message.channel.send('```\n====CHEGGBOT V2 BABY====\n```');

    puppet(args[1], msgRef, logger).then(async (msgRef) => {
        message.channel.send({
            files: [config.screenshot_dir]
        });
        logger.info(`PDF sent in discord`);
        await util.sleep(7)
        msgRef.delete(); //deletes status messages in Discord after completion
    })
    .catch(async (error) => {
        logger.error(error.error);
        logger.error(error.customError);
        msgRef.edit('```\nSorry dude something fucked up, maybe try again\n```');
    })        
}

function login (url) {
    return new Promise (async (resolve,reject) => {
        try {
            const loginBrowser = await puppeteer.launch({
                executablePath: config.browser_path,
                headless: false,
                userDataDir: './'
            });

            const page = await loginBrowser.newPage()
            
            await page.setUserAgent(userAgent);
            await page.goto(url, { waitUntil: 'networkidle0' })
            await page.setJavaScriptEnabled(false);

        } catch (error) {
            reject({error, 'customError': "Error setting up browser in login()"});
            return
        } 
        resolve(`Page opened to ${url}`)
    })
} //end function login()

function puppet(url, msgRef, logger) {
    return new Promise(async (resolve, reject) => {
    try{
        msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + "Starting browser process\n```")
                
        const browser = await puppeteer.launch({
            executablePath: config.browser_path,
            headless: true,
            userDataDir: './'
        });
        const page = await browser.newPage()
        
        await page.setUserAgent(userAgent);
        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(0);

        msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + "Browser is setup, loading page...\n```")
        try {
            await page.goto(url, { waitUntil: 'networkidle0' });
            await page.setJavaScriptEnabled(false);
        } catch (error) {
            reject({error, 'customError': `Error going to ${url} in puppet()`});
            return
        }

        msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + "Saving answer...\n```")
        try {
            await page.screenshot({path: config.screenshot_dir, fullPage: true})
        } catch (error) {
            reject({error, 'customError': `Error taking screenshot/PDF in puppet()`});
            return
        }

        try {
            await logger.info('PDF created in answers directory');
            msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + 'Answer saved.\n```');

            await logger.info(`Closing browser process...`);
            await util.sleep(0.5);
            await browser.close();
            
            await logger.info(`Browser process closed`);
            msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + 'Browser process closed\n```');
        } catch (error) {
            reject({error, 'customError': 'Error closing up the browser in puppet()'});
            return
        }
    } catch (error) {
        reject({error, 'customError': 'Error setting up the browser in puppet()'})
        return
    }
    resolve(msgRef);
    })
} //end function puppet()

export default {run}