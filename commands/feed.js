// import chickenstats from '../utilities/chickenstats.json';
// import fs from 'fs';


function run (message) {
    message.channel.send("Mmmmm\n");
    // const filePath = 'utilities/chickenstats.json'

    // var m = JSON.parse(fs.readFileSync(filePath).toString())
    // console.log(m)
    // fs.writeFileSync(filePath, JSON.stringify(chickenstats), function writeJSON(err) {
    //     if (err) return console.log(err);
    //     console.log(JSON.stringify(chickenstats));
    //     console.log('writing to ' + filePath);
    // });
    // message.channel.send(`ChickenBot now weighs ${chickenstats.weight}kg`);
    return;
}

export default {run}