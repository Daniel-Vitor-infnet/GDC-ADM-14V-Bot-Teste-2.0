const Discord = require("discord.js")
const Cor = require("./cores");
const Bot = require("./botinfo.js");
const Gif = require("./gifs.js");



module.exports = {
  Aviso: function (commandText) {
    const Aviso = new Discord.EmbedBuilder()
      .setColor(Cor.Aviso)
      .setAuthor({ name: 'Aviso', iconURL: Gif.MiniGifAviso })
      .setDescription(commandText + `\n\`\`\`diff\n- Essa message será deletada em 15segundos\`\`\``)
      .setThumbnail(Gif.Aviso)
      .setFooter({ text: 'Para mais dúvidas digite /ajuda ', iconURL: Gif.MiniGifHelp })
      .setTimestamp();

    return Aviso;
  },

  Erro: function (commandText) {
    const Erro = new Discord.EmbedBuilder()
      .setColor(Cor.Erro)
      .setAuthor({ name: 'Erro', iconURL: Gif.MiniGifErro })
      .setDescription(commandText + `\n\`\`\`diff\n- Essa message será deletada em 40 segundos\`\`\``) // Concatena o texto do comando com o texto padrão
      .setThumbnail(Gif.Erro)
      .setFooter({ text: 'Para mais dúvidas digite /ajuda ', iconURL: Gif.MiniGifHelp })
      .setTimestamp();

    return Erro;
  },

  Permissao: function (commandText) {
    const Permissao = new Discord.EmbedBuilder()
      .setColor(Cor.Permissao)
      .setAuthor({ name: 'Permissão', iconURL: Gif.MiniGifPermissao })
      .setDescription(commandText +`\n\`\`\`diff\n- Essa message será deletada em 2 min\`\`\`` )
      .setThumbnail(Gif.Permissao)
      .setFooter({ text: 'Para mais dúvidas digite /ajuda ', iconURL: Gif.MiniGifHelp })
      .setTimestamp();

    return Permissao;
  },

/////////////////////////////////////////////Não apaga automaticamente

  Aviso2: function (commandText) {
    const Aviso2 = new Discord.EmbedBuilder()
      .setColor(Cor.Aviso)
      .setAuthor({ name: 'Aviso', iconURL: Gif.MiniGifAviso })
      .setDescription(commandText + `\`\`\`diff\n- Está mensagem desaparecerá automaticamente após o reinício do Discord ou clique em "Ignorar mensagem".\`\`\``)
      .setThumbnail(Gif.Aviso)
      .setFooter({ text: 'Para mais dúvidas digite /ajuda ', iconURL: Gif.MiniGifHelp })
      .setTimestamp();

    return Aviso2;
  },
  
  BloqueadoComando: function (commandText) {
    const BloqueadoComando = new Discord.EmbedBuilder()
      .setColor(Cor.Permissao)
      .setAuthor({ name: 'Comando Bloqueado', iconURL: Gif.MiniGifAviso })
      .setDescription(commandText)
      .setThumbnail(Gif.ComandoBloqueado)
      .setFooter({ text: `Para mais dúvidas digite /ajuda`, iconURL: Gif.MiniGifHelp })
      .setTimestamp();

    return BloqueadoComando;
  },

}
