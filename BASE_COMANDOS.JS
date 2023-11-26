const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose();
const Cor = require("../../estruturas/cores.js");
const Bot = require("../../estruturas/botinfo.js");
const Gif = require("../../estruturas/gifs.js");
const { Aviso, Aviso2, Permissao, Permissao2, Erro, Erro2, BloqueadoComando } = require("../../estruturas/embedPersonalizados.js");

module.exports = {
  name: "apagar_tudo", // Nome do comando
  description: "Limpe o canal de texto (Apaga qualquer mensagem)", // Descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'quantidade',
      description: 'Número de mensagens para serem apagadas. Escolha entre 1 e 99',
      type: Discord.ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "motivo",
      description: "Insira por qual motivo você esta usando esse comando.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  run: async (client, interaction) => {
    // Extrair dados relevantes da interação
    const servidorId = interaction.guildId;
    const comando = interaction.commandName;

    // Verificar se o comando está bloqueado no banco de dados
    const db = new sqlite3.Database("comandos_bloqueados.db");
    const bloqueado = await verificaComandoBloqueado(servidorId, comando, db);
    db.close();


    //Bloqueio
    const ownerId = interaction.guild.ownerId;
    const DonoDoServidor = `<@!${ownerId}>`;
    const TextoDoBloqueado = `O comando \`${comando}\` foi bloqueado neste servidor pelo dono ${DonoDoServidor}. Qualquer dúvida entre em contato com a STAFF `;
    const Bloqueio = BloqueadoComando(TextoDoBloqueado);



    if (bloqueado) {
      interaction.reply({ embeds: [Bloqueio] })
      return;
    }

    // Meu código principal




  } //não apagar
}   //não apagar



// Função para verificar se o comando está bloqueado no banco de dados
async function verificaComandoBloqueado(servidorId, comando, db) {
  return new Promise((resolve, reject) => {
    db.get("SELECT Status FROM StatusCommands WHERE ServidorID = ? and Comandos = ? AND Status = 'Desabilitado'", servidorId, comando, (err, row) => {
      if (err) {
        console.error("Erro ao verificar se o comando está bloqueado:", err);
        reject(err);
      } else {
        resolve(!!row);
      }
    });
  });
}
