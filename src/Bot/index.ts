import { Client,IntentsBitField, GatewayIntentBits, Collection, Events, Message} from "discord.js";
import { TOKEN } from "./Config.json"
import { readdir } from "fs"

interface Info {
    prefix: string,
    name: string,
    ver: string,
    creators: string
}

export interface ClientObject extends Client {
    commands?: any
}

const INFO: Info = require("./Info.json");

export const GetInfo = () => INFO; 

const client : ClientObject = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
]});
client.commands = new Collection();
// Reading the File Directory for any TypeScript modules to code
readdir("./src/Bot/modules", (err, files) => {
    if(err) {
        console.log('I Dont feel so Good');
        console.log(`Failed to find folder modules ${err}`);
    }

    let tsfiles = files.filter(f => f.split(".").pop() === "ts");

    if(tsfiles.length <= 0) {
        console.log("Hey you have no modules please Create a module");
        return;
    }

    tsfiles.forEach((f, i) => {
        let props = require(`./modules/${f}`);
        console.log(`${f} || has Loaded Correctly!`);
        client.commands.set(props.help.name, props);
    });

});

client.on('ready', () => {
    const timeStarted = new Date;
    console.log(`${client.user?.tag} online at ${timeStarted.toLocaleDateString("en-AU")}`);
    console.log("Welcome :-)");
});

client.on('messageCreate',async (message: Message) => {
    if(message.author.bot) return;
    if(message.content.indexOf(INFO.prefix) !== 0) return;
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0].toLocaleLowerCase();
    const args = message.content.substring(INFO.prefix.length).split(" ");

    const commandFile = client.commands.get(cmd.slice(INFO.prefix.length));
    if(commandFile) {
        commandFile.run(client, message, args);
    }
});

client.login(TOKEN);