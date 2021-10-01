# Welcome to ChickenBot!

## Features:
* Main functionality is that the bot can return pdfs of any webpage you give it. Simply use the format `!pdf https://www.example.com`
* The bot uses puppeteer to open a headless instance of Google Chrome, access the given link (for sites that require logins it will use your active session), and generate a pdf
* Some more useful and sometimes fun functionality will be added in the future
* To see a full list of commands, simply type `!commands` 

### To get the bot running on your machine: 
#### 1. Copy this github repo to your desired location

#### 2. Create a new application with a unique name for your bot at https://discord.com/developers/applications
  * in the OAuth2 section make sure `bot` and `applications.commands` are selected, and paste the link that's generated into a new browser tab.
  * you'll be prompted to select which server you want to add the bot to, then click Authorize
  * back on the discord website, go to the Bot section and copy the token for your bot

#### 3. In the project folder open up `config.json` with an editor and paste your bot token into the parentheses

#### 4. Open up Command Prompt on your PC, navigate to the root directory of the project, and enter the command `node index` and voila your bot is running!
