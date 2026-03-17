// --- O TRUQUE PARA O RENDER NÃO DORMIR ---
const http = require('http');
http.createServer((req, res) => {
    res.write("Estou acordado!");
    res.end();
}).listen(8080);
// -----------------------------------------

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', () => {
    console.log(`✅ Cheguei! Logado como: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    // Mudando para um comando exclusivo seu
    if (message.content === '!caos') {
        message.reply('🐾 **CaosDoPacifico Online.** Jiji está vigiando o servidor!');
    }
});

client.login(process.env.DISCORD_TOKEN);
