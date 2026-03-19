const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const http = require('http');

// --- IDS DOS CANAIS ---
const canalAvisosId = '1483619645700440105';     
const canalBoasVindasId = '1351380955327238225'; 

// --- 1. CONFIGURAÇÃO DO BOT ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, 
    ]
});

// --- 2. O TRUQUE PARA O RENDER NÃO DORMIR & OUVIR O SEU PC ---
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    
    if (client.isReady()) {
        const canalAvisos = client.channels.cache.get(canalAvisosId);

        if (req.url === '/ligar') {
            client.user.setActivity('CaosDoPacifico ON 🟢', { type: ActivityType.Playing });
            if (canalAvisos) canalAvisos.send('🟢 **O servidor 1W1P está ONLINE!** Podem entrar no Radmin e abrir o Mine!');
            res.write("Sinal recebido: Servidor LIGADO!");
            
        } else if (req.url === '/desligar') {
            client.user.setActivity('Servidor Offline 🔴', { type: ActivityType.Watching });
            if (canalAvisos) canalAvisos.send('🔴 **O servidor 1W1P foi desligado.** Voltamos em breve!');
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

// Evento de Boas-Vindas
client.on('guildMemberAdd', (member) => {
    const canalBoasVindas = member.guild.channels.cache.get(canalBoasVindasId);
    if (!canalBoasVindas) return;

    const mensagens = [
        `🐾 Opa, **${member.user.username}**! Mais um sobrevivente chegou no **CaosDoPacifico**! Cuidado com os Creepers!`,
        `🐾 Bem-vindo(a), **${member.user.username}**! O Cat Jiji estava te esperando para minerar um pouco!`,
        `🐾 Um novo membro apareceu! Seja bem-vindo ao Caos, **${member.user.username}**!`
    ];

    const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
    canalBoasVindas.send(mensagemAleatoria);
});

client.once('ready', () => {
    console.log(`✅ O Pai tá ON! Logado como: ${client.user.tag}`);
    client.user.setActivity('Aguardando o servidor...', { type: ActivityType.Watching });
});

// Evento de mensagens (Comandos !caos e !ip)
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!caos') {
        message.reply('🐾 **CaosDoPacifico** está sendo vigiado pelo Cat Jiji na nuvem.');
    }

    // --- COMANDO !ip ---
    if (message.content === '!ip') {
        const ipEmbed = new EmbedBuilder()
            .setColor('#2ECC71') // Cor verde pro cartão
            .setTitle('🎮 Como entrar no CaosDoPacifico')
            .setDescription('Siga os passos abaixo para conectar no nosso servidor:')
            .addFields(
                { name: '🌐 Nome da Rede (Radmin)', value: '1W1PNEW', inline: true },
                { name: '🔑 Senha da Rede', value: '123456', inline: true },
                { name: '🔌 IP do Minecraft', value: '26.246.157.127:25565', inline: false },
                { name: '📦 Versão do Jogo', value: '1.21.10 Java (Vanilla)', inline: false }
            )
            .setFooter({ text: 'Cat Jiji está te esperando!' });

        message.reply({ embeds: [ipEmbed] });
    }
});

// --- 4. LOGIN ---
client.login(process.env.DISCORD_TOKEN);
