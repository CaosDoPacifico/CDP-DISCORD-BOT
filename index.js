const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const http = require('http');

// --- ID DO CANAL DE AVISOS ---
const canalAvisosId = '1483619645700440105';

// --- 1. CONFIGURAÇÃO DO BOT ---
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
    
    // Verifica se o bot está conectado no Discord
    if (client.isReady()) {
        const canal = client.channels.cache.get(canalAvisosId);

        if (req.url === '/ligar') {
            client.user.setActivity('CaosDoPacifico ON 🟢', { type: ActivityType.Playing });
            if (canal) canal.send('🟢 **O servidor do CaosDoPacifico está ONLINE!** Podem entrar no Radmin e abrir o Mine!');
            res.write("Sinal recebido: Servidor LIGADO!");
            
        } else if (req.url === '/desligar') {
            client.user.setActivity('Servidor Offline 🔴', { type: ActivityType.Watching });
            if (canal) canal.send('🔴 **O servidor foi desligado.** Voltamos em breve!');
            res.write("Sinal recebido: Servidor DESLIGADO!");
            
        } else {
            res.write("O Cat Jiji está acordado! 🐾");
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
    client.user.setActivity('Aguardando o servidor...', { type: ActivityType.Watching });
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!caos') {
        message.reply('🐾 **CaosDoPacifico** está sendo vigiado pelo Cat Jiji na nuvem.');
    }
});

// --- 4. LOGIN ---
client.login(process.env.DISCORD_TOKEN);
