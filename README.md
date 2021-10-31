# Welcome to ChickenBot!

## Commands:
* `!pdf https://www.example.com`
    * Bot will return a pdf of any webpage you give it. Simply use the following format 
    * Uses [puppeteer-extra](https://www.npmjs.com/package/puppeteer-extra) with Stealth Plugin to access the given link with a headless instance of chrome, generates a PDF of the page, and sends the file in the Discord Chat

* `!mp3 https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    * Bot will return an mp3 file for any given YouTube link
    * Uses [**youtube-mp3-downloader**](https://www.npmjs.com/package/youtube-mp3-downloader) as well as [**ffmpeg**](https://www.ffmpeg.org/) to download and convert the video

* `!feed` 
    * Feeds the Chicken and keeps him happy

* `!commands`
    * Displays all available commands
   
* Comprehensive logging is built into the bot, which saves daily logs as html files in the `/logs` directory

## To get the bot running on your machine: 
#### 1. Copy this github repo to your desired location

#### 2. Create a new application with a unique name for your bot at https://discord.com/developers/applications
  * in the OAuth2 section make sure `bot` and `applications.commands` are selected, and paste the link that's generated into a new browser tab.
  * you'll be prompted to select which server you want to add the bot to, then click Authorize
  * back on the discord website, go to the Bot section and copy the token for your bot

#### 3. In the project folder open up `config.json` with an editor (VSCode recommended)
  * paste your discord bot's token here, as well as your installation directories for ffmpeg and chrome

#### 4. Open up Command Prompt on your PC, navigate to the root directory of the project, and enter the command `npm run start` and voila your bot is running!

#### 5. IMPORTANT STEP for full Page-to-PDF functionality: 
  * If you plan to get PDFs for any signs that require you to be logged in to view the content, you'll need to log in through the same Chrome instance that puppeteer will use. 
  * To do this, once your bot is running on your server, type `pdf login https://siteYouWantToLogInto.com` (replace with whatever URL you need)
  * This will open a non-headless instance of the browser and allow you to log in. Once you've done that just close out that browser window. 
  * You'll probably only ever need to do this once
