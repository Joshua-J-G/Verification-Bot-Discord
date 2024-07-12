import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN } from "./Config.json"
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.on('ready', () => {
    const timeStarted = new Date;
    console.log(`${client.user?.tag} online at ${timeStarted.toLocaleDateString("en-AU")}`);
    console.log("Welcome :-)");
});















client.login(TOKEN);