import winston from 'winston';
const {format, createLogger, transports} = winston;
const {timestamp, combine, printf} = format;

export default function buildLogger() {

    var logger;
    
    //getting date info for file naming
    var currentDate = new Date();
    var m = currentDate.getMonth() + 1;
    var d = currentDate.getDate();
    var y = currentDate.getFullYear();

    //logging format for console
    const consoleFormat = printf(({ level, message, timestamp, stack}) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    //logging format for html file
    const myFormat = printf(({ level, message, timestamp, stack}) => {
        //switch statement assigns colors to different log levels
        switch (level) {
            case 'info': 
                level = '<span style="color:#228B22"><b>info</b></span>';
                break;    
            case 'warn':
                level = '<span style="color:#c17701"><b>warn</b></span>';
                break;
            case 'error':
                level = '<span style="color:#9d0101"><b>error</b></span>';
                break;
        }
        return `${timestamp} ${level}: ${stack || message}<br>`;
    });
    
    return logger = createLogger({
        level: 'debug',
        format: combine(
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.errors({stack: true}),
            myFormat),
        // defaultMeta: {service: 'user-service'},
        transports: [
            new transports.File({filename: `./logs/log_${m}_${d}_${y}.html`}),
            //new transports.File({filename: `./logs/errorlog_${m}_${d}_${y}.html`, level: 'error'}), 
                //if you want a separate log file for just errors, un-comment the above line
            new transports.Console({format: combine(
                format.colorize(),
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.errors({stack: true}),
                consoleFormat)})
        ],
    });
}
