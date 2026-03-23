const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// ==========================================
//           CONFIGURAÇÕES DOS CANAIS
// ==========================================
// Verifique se os IDs abaixo estão corretos!
const CANAL_AVISOS_ID = 'COLOQUE_O_ID_AQUI'; 
const CANAL_BOAS_VINDAS_ID = 'COLOQUE_O_ID_AQUI';

// ==========================================
//              CONFIGURAÇÃO DO BOT
// ==========================================
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

// ==========================================
//           SISTEMA DE COMANDOS
// ==========================================
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!caos') {
        message.reply('🐾 **CaosDoPacifico Online!** O Cat Jiji está vigiando o servidor na nuvem.');
    }
});

// ==========================================
//           SISTEMA DE BOAS-VINDAS
// ==========================================
client.on('guildMemberAdd', (member) => {
    const canalBoasVindas = member.guild.channels.cache.get(CANAL_BOAS_VINDAS_ID);
    
    if (canalBoasVindas) {
        const mensagens = [
            `🐾 Olá ${member}, bem-vindo(a) ao **CaosDoPacifico**! Sinta-se em casa.`,
            `🎉 Olha só quem chegou! E aí ${member}, preparado(a) para o **Caos**?`,
            `✨ Um novo aventureiro! Boas-vindas ao **CaosDoPacifico**, ${member}. Puxa uma cadeira e bora jogar!`
        ];
        const mensagemSorteada = mensagens[Math.floor(Math.random() * mensagens.length)];
        canalBoasVindas.send(mensagemSorteada);
    }
});

// ==========================================
//     TRUQUE PARA FICAR ONLINE (KOYEB/BAT)
// ==========================================
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    if (req.url === '/ligar') {
        const canal = client.channels.cache.get(CANAL_AVISOS_ID);
        if (canal) {
            canal.send('🟢 **O servidor TWIP está ONLINE!** Podem entrar no Radmin e abrir o Mine!');
            console.log('Mensagem de LIGAR enviada!');
        }
        res.write("Comando LIGAR executado.");
    } 
    else if (req.url === '/desligar') {
        const canal = client.channels.cache.get(CANAL_AVISOS_ID);
        if (canal) {
            canal.send('🔴 **O servidor TWIP foi desligado.** Voltamos em breve!');
            console.log('Mensagem de DESLIGAR enviada!');
        }
        res.write("Comando DESLIGAR executado.");
    } 
    else {
        res.write("O Cat Jiji está acordado! 🐾");
    }
    res.end();
}).listen(port, () => {
    console.log(`🚀 Servidor Web rodando na porta ${port}`);
});

// ==========================================
//                   LOGIN
// ==========================================
client.login(process.env.DISCORD_TOKEN);
