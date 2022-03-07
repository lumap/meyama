import * as deps from "./deps.ts";

const bot = deps.createBot({
    intents: ["GuildMessages", "Guilds", "GuildMessages","DirectMessages"],
    token: deps.config.token,
    botId: deps.config.botId,
    events: deps.createEventHandlers({
        async messageCreate(bot, message) {
            if (message.isBot) return;
            if (message.content.includes("https://media.discordapp.net") && checkEndExtension(message.content.toLowerCase())) {
                try {
                    await bot.helpers.deleteMessage(message.channelId, message.id, "Replacing media.discordapp.net with cdn.discordapp.com");
                    await bot.helpers.sendMessage(message.channelId, { content: `Sent by <@${message.authorId}>\n` + message.content.replaceAll("https://media.discordapp.net", "https://cdn.discordapp.com") })
                } catch {
                    "1";
                }
            }
        },
        ready() {
            console.log("ready or something idk")
        }
    }),
})

deps.startBot(bot)

function status() {
    bot.helpers.editBotStatus({
        status: "idle",
        activities: [
            {
                name: "war against russia",
                type: deps.ActivityTypes.Watching,
                createdAt: 1
            }
        ]
    })
}
status()
setInterval(status,1800000)

function checkEndExtension(str: string): boolean {
    const exts = [".mov", ".mp4", ".flv", ".m4a",".mkv","avi"];
    let res = false;
    for (let i = 0; i < exts.length && res == false; i++) {
        res = str.endsWith(exts[i])
    }
    return res;
}