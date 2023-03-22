require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const CHAT_MODEL = "gpt-3.5-turbo";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, //vai nos dar as informações das informações dos servers. guilds = servers
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent 
    ]
});

client.on('ready', () => {
    console.log('HELLO WOLD!! \n O bot rodando aiii!');
});

const configuration = new Configuration({
    apiKey: process.env.API_KEY
});

const openAi = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    if(message.channel.id !== process.env.CHANNEL_ID) return;
    if(message.content.startsWith('!')) return;
    
    let conversationLog = [{ role: "system", content: "You are a hippie chatbot which talks portuguese as main language." }];

    await message.channel.sendTyping();

    let prevMessages = await message.channel.messages.fetch({
        limit: 15 // robo irá responder as primeiras 15 mensagens
    });

    prevMessages.reverse();

    prevMessages.forEach(msg => {
        if(message.content.startsWith('!')) return;
        if(msg.author.id !== client.user.id && message.author.bot) return;
        if(msg.author.id !== message.author.id) return;

        conversationLog.push({
            role: "user",
            content: msg.content
        });
    });

    conversationLog.push({
        role: "user",
        content: message.content
    });

    const result = await openAi.createChatCompletion({
        model: CHAT_MODEL,
        messages: conversationLog
    });

    message.reply(result.data.choices[0].message);
});

client.login(process.env.TOKEN);