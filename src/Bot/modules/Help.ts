import { Client, GatewayIntentBits, Collection, Events, Message, ChannelType } from "discord.js";
import { GetInfo, ClientObject} from "../index";

module.exports.run = async (client: ClientObject, message: Message, args: any) => {
    if(message.channel.type === ChannelType.DM) return;
    const INFO = GetInfo();
    message.channel.send(`${INFO.name} by ${INFO.creators} ver: ${INFO.ver} Prefix: ${INFO.prefix}`);
}

module.exports.help = {
    // always lowercase
    name: "help"
}