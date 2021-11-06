import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
//puppeteer.use(StealthPlugin());
import * as util from '../utilities/functions.js';
import config from '../config.json'
import buildLogger from '../utilities/build-logger.js';

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';

async function run(message, args) {
    try {
        var logger = buildLogger();
        const url = args[1];
        
        //if invalid argument
        if (!url || !util.validator.isURL(url, {protocols: ['http', 'https'], require_protocol: true})) return message.channel.send("Usage: `!pdf https://www.chegg.com/answerpagelink`");
            const browser = await puppeteer.launch({
                executablePath: config.browser_path,
                headless: true,
                userDataDir: config.chrome_data_path
            });
        logger.info("Browser process started");
        
        //sends "checking your link" message
        util.checkingLink(message);
        
        logger.info('\n\n\n====CHEGGBOT V2====\n');
        var msgRef = await message.channel.send('```\n====CHEGGBOT V2====\n```');
        
        //function declaration
        const puppet = async () => {
            const page = await browser.newPage()
            
            await page.setUserAgent(userAgent);
            await page.setJavaScriptEnabled(true);
            await page.setDefaultNavigationTimeout(0);
            
            logger.info(`Trying to open ${url}`);
            msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + "Loading your URL...\n```")
            
            await page.goto(url, { waitUntil: 'networkidle0' });
            await page.setJavaScriptEnabled(false);
            
            logger.info("Taking screenshot");
            msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + "Saving answer...\n```")
            
            await page.screenshot({path: config.screenshot_dir, fullPage: true})
            //await page.pdf({path: config.pdf_dir, format: 'a2'})
            
            logger.info(`Answer saved in ${config.screenshot_dir}`);
            msgRef = await msgRef.edit(msgRef.content.substring(0, msgRef.content.length-3) + 'Sending to Discord!\n```');
        } //end declaration
        
        puppet().then(async () => {
            await message.channel.send({
                files: [config.screenshot_dir]
            });
            logger.info(`PDF sent in discord`);
            await util.sleep(4)
            msgRef.delete(); //deletes status messages in Discord after completion
            await browser.close();      
        })
        .catch((error) => {
            logger.error(error)
            msgRef.edit('```\nSorry dude something fucked up, maybe try again\n```');
        })  
    } catch (error) {
        logger.error(error)
        return
    }
}
    
    export default {run}