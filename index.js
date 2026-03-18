const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const http = require('http');

// --- IDS DOS CANAIS ---
const canalAvisosId = '1483619645700440105';     // Canal onde avisa que o servidor abriu/fechou
const canalBoasVindasId = '1351380955327238225'; // Canal onde o bot dá oi para os novatos

// --- 1. CONFIGURAÇÃO DO BOT ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, // Permissão para ver quem entra no servidor
    ]
});

// --- 2. O TRUQUE PARA O RENDER NÃO DORMIR & OUVIR O SEU PC ---
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    
    // Verifica se o bot já conectou no Discord
    if (client.isReady()) {
        const canalAvisos = client.channels.cache.get(canalAvisosId);

        if (req.url === '/ligar') {
            client.user.setActivity('CaosDoPacifico ON 🟢', { type: ActivityType.Playing });
            if (canalAvisos) canalAvisos.send('🟢 **O servidor do CaosDoPacifico está ONLINE!** Podem entrar no Radmin e abrir o Mine!');
            res.write("Sinal recebido: Servidor LIGADO!");
            
        } else if (req.url === '/desligar') {
            client.user.setActivity('Servidor Offline 🔴', { type: ActivityType.Watching });
            if (canalAvisos) canalAvisos.send('🔴 **O servidor foi desligado.** Voltamos em breve!');
            res.write("Sinal recebido: Servidor DESLIGADO!");
            
        } else {
            res.write("O Cat Jiji está acordado! 🐾");
        }
    } else {
        res.write("Servidor web on, mas o bot ainda está conectando...");
    }
    res.end();
}).listen(port, () => {
    console.log(`🚀 Servidor de monitoramento ON na porta ${port}`);
});

// --- 3. EVENTOS DO BOT ---

// Evento de Boas-Vindas (Quando alguém entra)
client.on('guildMemberAdd', (member) => {
    const canalBoasVindas = member.guild.channels.cache.get(canalBoasVindasId);
    if (!canalBoasVindas) return;

    const mensagens = [
        `🐾 Opa, **${member.user.username}**! Mais um sobrevivente chegou no **CaosDoPacifico**! Cuidado com os Creepers!`,
        `🐾 Bem-vindo(a), **${member.user.username}**! O Cat Jiji estava te esperando para brincar um pouco!`,
        `🐾 Um novo membro apareceu! Seja bem-vindo ao Caos, **${member.user.username}**!`
    ];

    const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
    canalBoasVindas.send(mensagemAleatoria);
});

// Evento quando o bot liga
client.once('ready', () => {
    console.log(`✅ O Pai tá ON! Logado como: ${client.user.tag}`);
    client.user.setActivity('Aguardando o servidor...', { type: ActivityType.Watching });
});

// Evento de mensagens (Comando !caos)
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!caos') {
        message.reply('🐾 **CaosDoPacifico** está sendo vigiado pelo Cat Jiji na nuvem.');
    }
});

// --- 4. LOGIN ---
client.login(process.env.DISCORD_TOKEN);
