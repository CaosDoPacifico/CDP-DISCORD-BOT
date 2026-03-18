const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const http = require('http');

// --- 1. CONFIGURAÇÃO DO BOT (Movido para cima para o truque enxergar o bot) ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

// --- 2. O TRUQUE PARA FICAR ONLINE E OUVIR O SEU .BAT ---
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    
    // Verifica se o bot já logou no Discord antes de tentar mudar o status
    if (client.isReady()) {
        if (req.url === '/ligar') {
            client.user.setActivity('Servidor ON 🟢', { type: ActivityType.Playing });
            res.write("Sinal recebido: Servidor LIGADO!");
        } else if (req.url === '/desligar') {
            client.user.setActivity('Servidor Offline 🔴', { type: ActivityType.Watching });
            res.write("Sinal recebido: Servidor DESLIGADO!");
        } else {
            res.write("Jiji está acordado! 🐾");
        }
    } else {
        res.write("Servidor web on, mas o bot do Discord ainda está conectando...");
    }
    
    res.end();
}).listen(port, () => {
    console.log(`🚀 Servidor de monitoramento ON na porta ${port}`);
});

// --- 3. EVENTOS DO BOT ---
client.once('ready', () => {
    console.log(`✅ O Pai tá ON! Logado como: ${client.user.tag}`);
    // O bot já nasce com o status de "Aguardando" até você ligar o PC
    client.user.setActivity('Aguardando o servidor...', { type: ActivityType.Watching });
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!caos') {
        message.reply('🐾 **CaosDoPacifico Online!** Jiji está vigiando o servidor na nuvem.');
    }
});

// --- 4. LOGIN ---
client.login(process.env.DISCORD_TOKEN);
