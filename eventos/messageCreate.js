const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../estruturas/modulos.js");
const functions = require("../estruturas/functions_import.js");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (!message.guild || message.author.bot) return;


    //Verifica o envio de convites
    if (message.guild) {
      const db = new sqlite3.Database("database_sqlite.db");
      // Consulta o ID do servidor específico no banco de dados
      db.get('SELECT * FROM Eventos WHERE EventoNome = "BloquearConvites" AND ServidorID = ? AND Status = "Habilitado" ', [message.guild.id], (err, row) => {
        if (err) {
          console.error(err);
          return;
        }
        // Se o servidor estiver no banco de dados
        if ((message.member.permissions.has(Discord.PermissionFlagsBits.Administrator) || message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages) || message.member.roles.cache.has(GDC.Cargo.ADM))) {
          return;
        }
        //Aviso proibido mandar convites
        const TextoDeConvite = `${message.author}, É estritamente proibido enviar convites de outros servidores neste servidor. Em caso de uma situação específica, entre em contato com a equipe da STAFF.`;
        const AvisoConvite = functions.Aviso3(TextoDeConvite);

        // Se o servidor estiver no banco de dados
        if (row) {
          // Verifica se a mensagem contém um convite de outro servidor
          if (message.content.includes('discord.gg/') || message.content.includes('discord.com/invite/')) {
            // Extrai o código do convite
            const inviteCode = message.content.split('discord.gg/')[1] || message.content.split('discord.com/invite/')[1];

            // Verifica a validade do convite usando a API do Discord
            fetch(`https://discord.com/api/v10/invites/${inviteCode}`)
              .then(response => response.json())
              .then(inviteData => {
                // Se o convite não for válido ou pertencer a outro servidor, remova a mensagem
                if (!inviteData || (inviteData.guild && inviteData.guild.id !== message.guild.id)) {
                  message.delete();
                  message.channel.send({embeds: [AvisoConvite]});
                }
              })
              .catch(err => console.error(err));
          }
        }
      });
    }
  }
}