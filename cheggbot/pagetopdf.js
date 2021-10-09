import pkg from 'puppeteer';
const puppeteer = pkg;
import buildLogger from '../utilities/build-logger.js';

async function run(url) {
        
        const logger = buildLogger();

        logger.info();
        logger.info('====PAGETOPDF.JS====');
        logger.info();

        //main try
        try {

            logger.info(`Launching browser process...`);

            const browser = await puppeteer.launch({
                executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
                headless: true,
                //devtools: true,
                slowMo: 250,
                userDataDir: 'C:/userData'
            });

            const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
            
            const page = await browser.newPage();
            
            await preparePageForTests(page);
            await page.setUserAgent(userAgent);
            await page.setJavaScriptEnabled(true);
            await page.setDefaultNavigationTimeout(0);
            
            await logger.info(`Browser opened. Attempting to access url:`);
            await logger.warn(`${url}`);

            try {
                await page.goto(url);
            } catch (error) {
                logger.error(`Error trying to go to ${url}`);
                return false;
            }
            
            await logger.info(`Page done loading, creating PDF...`);

            await page.pdf({ path: 'cheggbot/answers/chegg.pdf', format: 'a4' });

            await logger.info(`PDF created in answers directory`);

            await logger.info(`Closing browser process...`)
            await sleep(1);
            await browser.close();
            await logger.info(`Browser process closed`);

            return true;

        } catch (error) {
            logger.error(error);
            return false;
        }
        
}

export default {run}

const preparePageForTests = async (page) => {
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });
}

function sleep(min, max=min+1) {
    var ms = Math.floor((Math.random() * (max-min) + min)*1000);
    //logger.warn(`Waiting ${ms} milliseconds before proceeding to next student`);
    return new Promise(resolve => setTimeout(resolve, ms));
}