import * as deps from "./deps.ts";


console.log('Bot starting...')
const time = Date.now();


function status() {
    bot.helpers.editBotStatus({
        status: "idle",
        activities: [
            {
                name: "discord messages",
                type: deps.ActivityTypes.Watching,
                createdAt: 1
            }
        ]
    })
}


const bot = deps.createBot({
    intents: ["GuildMessages", "Guilds", "GuildMessages", "DirectMessages"],
    token: deps.config.token,
    botId: deps.config.botId,
    events: deps.createEventHandlers({
        async messageCreate(bot, message) {
            if (message.isBot) return;
            if (message.content.includes("https://media.discordapp.net") && checkEndExtension(message.content.toLowerCase())) {
                try {
                    await bot.helpers.deleteMessage(message.channelId, message.id, "Replacing media.discordapp.net with cdn.discordapp.com");
                    await bot.helpers.sendMessage(message.channelId, { content: `From<@${message.authorId}>\n> ` + message.content.replaceAll("https://media.discordapp.net", "https://cdn.discordapp.com") })
                } catch {
                    "1";
                }
            }
        },
        ready() {
            console.log(`Ready! Took ${Date.now() - time}ms`)
            status()
            setInterval(status, 1800000)
        }
    }),
})

deps.startBot(bot)

function checkEndExtension(str: string): boolean {
    const exts = [".mov", ".mp4", ".flv", ".m4a", ".mkv", "avi"];
    let res = false;
    for (let i = 0; i < exts.length && res == false; i++) {
        res = str.endsWith(exts[i])
    }
    return res;
}