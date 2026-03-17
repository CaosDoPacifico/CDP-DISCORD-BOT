const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// --- 1. O TRUQUE PARA FICAR ONLINE (TEM QUE VIR PRIMEIRO) ---
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.write("O Cat Jiji está acordado! 🐾");
    res.end();
}).listen(port, () => {
    console.log(`🚀 Servidor de monitoramento ON na porta ${port}`);
});

// --- 2. CONFIGURAÇÃO DO BOT ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', () => {
    console.log(`✅ O Pai tá ON! Logado como: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!caos') {
        message.reply('🐾 **CaosDoPacifico Online!** O Cat Jiji está vigiando o servidor na nuvem.');
    }
});

// --- 3. LOGIN (USANDO A VARIÁVEL QUE VOCÊ CRIOU NO RENDER) ---
client.login(process.env.DISCORD_TOKEN);
