require("dotenv").config();
const { publicIpv6 } = require("public-ip");
const {Client, Events, ChannelType, GatewayIntentBits, Partials} = require("discord.js");
const codeIndent = "```";
const DiscordClient = new Client({intents: Object.keys(GatewayIntentBits), partials: Object.values(Partials)});
(async () => {
    DiscordClient.on(Events.ClientReady, async()=>{
        console.log("PUBLIC IP SERVER IS RUNNING...");
    });
    DiscordClient.on(Events.MessageCreate, async(ctx) =>{
        if(ctx.channel.type===ChannelType.DM){
            if(ctx.author.id===process.env.AUTH_USER){
                await ctx.author.send({content: `<@${ctx.author.id}> MittyServer IP: ${codeIndent}${await publicIpv6()}${codeIndent}`});
            }
        }
    });
    DiscordClient.login(process.env.DC_TOKEN);
})();
