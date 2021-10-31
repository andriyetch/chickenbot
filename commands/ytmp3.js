import YoutubeMp3Downloader from "youtube-mp3-downloader";
import buildLogger from '../utilities/build-logger.js';
import config from '../config.json'
import validator from 'validator';

async function run (message) {
    var logger = buildLogger();
    var link = message.content.split(' ')[1]
    if (!link) return message.channel.send("Usage: `!mp3 https://www.youtube.com/watch?v=dQw4w9WgXcQ`");

    var msgRef = await message.channel.send("Converting to mp3...");

    urlWork(link).then((videoID) => {
        console.log(`Converting ${link} to mp3`)
        convertVideo(msgRef, videoID).then((file) => {
            msgRef.edit({
                content: "Here you go!",
                files: [file]
            });
        })
    }).catch((err) => {
        logger.error(err);
        msgRef.edit(err);
    })
}

function convertVideo (msgRef, videoID) {
    return new Promise((resolve, reject) => {    
        var YD = new YoutubeMp3Downloader({
            "ffmpegPath": config.ffmpeg_path,
            "outputPath": "./mp3s",
            "youtubeVideoQuality": "highestaudio",
            "queueParallelism": 1,
            "progressTimeout": 2000,
            "allowWebm": false
        });
        
        YD.download(videoID);

        YD.on("finished", function(err, data) {
            resolve(data.file);
        });
        
        YD.on("error", function(error) {
            reject("Had a problem converting this, please try again.");
        });
        
        YD.on("progress", function(progress) {
            var percentage = parseFloat(JSON.stringify(progress.progress.percentage)).toFixed(2)
            msgRef.edit(msgRef.content + ' ' + percentage + '%');
        });  
    })    
}

function urlWork(link) {
    return new Promise((resolve, reject) => {
        if (validator.isURL(link) && (link.split('youtube.com/watch?v=')[1] || link.split('youtu.be/')[1])) {
            var videoID = link.split('youtube.com/watch?v=')[1] || link.split('youtu.be/')[1];
            resolve(videoID);
        } else reject("Invalid URL");
    })
}

export default {run}