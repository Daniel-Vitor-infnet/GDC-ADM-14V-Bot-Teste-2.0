const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../../modulos.js");
const functions = require("../../functions_import.js");
const Emoji = require("../emoji");


const comandos = {
  ///STAFF
  ApagarTudo: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  apagar_tudo`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nLimpe o canal de texto (Apaga qualquer mensagem). Vc deve escolher quantidade e o motivo\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Quantidade\`: Deve escolher um número entre 1 e 99\n" +
      "\`Motivo\`:  Deve justificar com algum motivo\n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Caso solicite muitas remoções, pode demorar até que todas sejam apagadas. Sempre confira os avisos.\n" +
      "\`2.\`Apaga qualquer mensagem\n"
    ),

  Apagar: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  apagar`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nLimpe o canal de texto. Vc deve escolher quantidade e o motivo\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Quantidade\`: Deve escolher um número entre 1 e 99\n" +
      "\`Motivo\`:  Deve justificar com algum motivo\n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Caso solicite muitas remoções, pode demorar até que todas sejam apagadas. Sempre confira os avisos.\n" +
      "\`2.\`Não consegue apagar mensagens de bots e membros da staff\n"
    ),

  Ban: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  ban`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nBane membros dentro e fora do servidor pelo ID.\n**" +
      "*Vídeo de como pegar o ID: https://youtu.be/ZR0rYHvST30 .\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`ID\`: Deve fornecer o id do membro que deseja banir\n" +
      "\`Motivo\`:  Deve justificar com algum motivo\n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Pode banir qualquer membro do servidor mesmo sem ter entrado\n"
    ),

  Embed_Custom: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Embed Custom`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nUse o bot para enviar uma mensagem no chat no servidor ou no privado de um membro\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`tipo\`O comando possuí diversas opções de embed personalizados.\n" +
      "\`Membro\` Deve escolher um membro caso queira mencionar ou enviar no privado \n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Escolha qual tipo de embed deseja enviar. \n"
    ),



  gerenciarChat: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Gerenciar Chat`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nGerencia o chat atual bloquenado ou desbloqueando para membros exceto STAFF\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Status\`: Deve escolher entre Bloquear ou Desbloquear\n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Para ver quais chats estão bloqueados use /lista\n"
    ),
  ///Dono
  GerenciarCargos: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Gerenciar Cargos`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\n Gerencia os carogs que podem pegos automaticamente.\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Escolha\`: Deve escolher entre adicionar ou remover cargos da lista de cargos bloqueados\n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Alguns cargos já são bloqueados por padrão, porém ss demais cargos serão todos liberados então tome cuidado !!!\n" +
      "\`2.\`Para ver cargos bloqueados ou disponíveis use /lista\n"
    ),

  GerenciarComandos: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Gerenciar Comandos`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\n Gerencia os comandos ativando ou desativando no servidor.\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Comando\`: Deve escolher qual comando quer Desativar/Ativar (O próprio comando fornecerá as opções de comandos.)\n" +
      "\`Status\`:  Deve escolher o status 'Desativar/Ativar', (O próprio comando fornecerá as opções de status.)  \n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`O comando desativado não poderá ser usado por **ninguém** do servidor\n" +
      "\`2.\`Para ver quais comandos estão bloqueados use /lista\n"

    ),

  gerenciarEventos: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Gerenciar Eventos`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\n Gerencia os eventos ativando ou desativando no servidor.\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Evento\`: Deve escolher qual evento quer Desativar/Ativar (O próprio comando fornecerá as opções de eventos.)\n" +
      "\`Status\`:  Deve escolher o status 'Habilitar/desabilitar', (O próprio comando fornecerá as opções de status.)  \n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Para ver quais eventos estão ativos use /lista\n"

    ),

  GerenciarPost: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Gerenciar Post`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\n Gerencia os post (reddit) ativando ou desativando no canal.\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Post\`:   Deve escolher qual post quer Desativar/Ativar (O próprio comando fornecerá as opções de post.)\n" +
      "\`Status\`: Deve escolher o status 'Desativar/Ativar', (O próprio comando fornecerá as opções de status.)  \n" +
      "\`intervalo_em_minutos\`:  Deve fornecer um intervalo de no minimo 21 minutos ou mais entre os post. O intervalo sempre deve estar em minutos  \n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Para trocar de canal é só ativalo no caso que deseja que substituíra o antigo\n" +
      "\`2.\`Só pode ter um de cada tipo de evento por servidor\n" +
      "\`3.\`Tempo minimo do intervalo foi dedfinido para 20 minutos para evitar o span. 20min X 1h = 3 post por hora x 24h = 72 post por dia\n" +
      "\`4.\`Para ver quais eventos estão no seu servidor e em quais canais use /lista\n"

    ),


  ///Membros

  Ajuda: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  ajuda`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nFornecerá informações abrangentes sobre todos os comandos do bot.\n**" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Caso alguma informação esteja incorreta e não esteja funcionando, use o comando \`suporte\` e informe o problema. \n"
    ),


  Avatar: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Avatar`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nVeja seu próprio avatar ou mencione um membro para ver seu avatar\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Membro\`: Deve escolher um membro caso queira ver seu avatar \n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Caso queira ver seu próprio avatar use apenas \`\`/avatar\`\` \n" +
      "\`2.\`É possível baixar o avatar do membro\n"
    ),

  infoBot: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Info Bot`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nVeja todas informações do bot\n**"
    ),

  infoMembro: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Info Membro`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nVeja suas informações ou de outro membro\n**" +
      "\`\`\`Complementos: ↓↓↓\`\`\`\n" +
      "\`Membro\`: Deve escolher um membro caso queira ver suas informações \n" +
      "\`\`\`Observações: ↓↓↓\`\`\`\n" +
      "\`1.\`Caso queira ver suas próprias informações use apenas \`\`/info_membro\`\`\n"
    ),

  infoServer: new Discord.EmbedBuilder()
    .setColor(Bot.Cor)
    .setTitle(`${Emoji.Barra}  Info Server`)
    .setThumbnail(Gif.Comando)
    .setDescription(
      "**\nVeja todas informações do servidor\n**"
    ),

};

module.exports = comandos;

