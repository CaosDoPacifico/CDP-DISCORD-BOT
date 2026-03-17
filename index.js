// --- TRUQUE ATUALIZADO PARA O RENDER ---
const http = require('http');

// O Render envia a porta correta pela variável process.env.PORT
const port = process.env.PORT || 8080; 

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.write("O Cat Jiji está acordado! 🐾");
    res.end();
}).listen(port, () => {
    console.log(`Servidor de monitoramento rodando na porta ${port}`);
});
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
