import buildLogger from './build-logger.js';
import cron from 'node-cron';
import * as util from '../utilities/functions.js';
var logger = buildLogger();

cron.schedule(`* * * * * *`, () => {
    console.log(`Logger has been rebuilt for current date: ${util.getDateString()}`);
    logger = buildLogger();
});


export default function () {
    return logger;
}