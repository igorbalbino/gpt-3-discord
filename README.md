# Bot do CHAT GPT para Discord

Bot que faz queries com o chatgpt modelo GPT 3.5 e retorna no próprio Discord.
O bot está preparado para responder especificamente a quem fez a pergunta, não responderá de forma aleatória.
Versão node: 18.15.0

# Como rodar

Para rodar, deve ter o Node 18.15.0 rodando.
Clone o projeto e crie um arquivo `.env`.
Configure as seguintes informações:
`TOKEN - Token de desenvolvedor do Discord`
`API_KEY - Chave de API da OpenAI.`
`CHANNEL_ID - ID do canal do Discord no qual a IA deve responder.`

Tendo esses itens configurados, rode o comando `npm install` para instalar as dependências.
Ao terminar de instalar as dependências, rode o comando `node index.js` de dentro do diretório: `gpt-3-discord/`

# Changelog

Projeto adicionado já funcionando.