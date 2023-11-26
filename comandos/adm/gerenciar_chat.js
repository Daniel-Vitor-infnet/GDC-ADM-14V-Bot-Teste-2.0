const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../../estruturas/modulos.js");
const functions = require("../../estruturas/functions_import.js");

module.exports = {
  name: "gerenciar_chat",
  description: "Bloqueie um canal.",
  type: 1,
  options: [
    {
      name: "status",
      description: "Escolha 'Bloquear' para ativar o canal ou 'Desbloquear' para desativá-lo",
      type: 3,
      required: true,
      choices: [
        { name: "Bloquear", value: "Bloquear" },
        { name: "Desbloquear", value: "Desbloquear" },
      ],
    },
  ],

  run: async (client, interaction) => {
    // Verificar se o comando está bloqueado no banco de dados
    if (await functions.verificaComandoBloqueado(interaction.guildId, interaction.commandName)) {
      interaction.reply({ embeds: [functions.BloqueadoComando(`${interaction.commandName}`, `${interaction.guild.ownerId}`)] })
      return;
    }


    //////////////////////////////////////////////////////////////////////////////////EMBEDS////////////////////////////////////////////////////////////////////////////////////////////////

    //Aviso já esta bloqueado
    const TextoDoBloqueado = `❌ O canal de texto já está bloqueado!`;
    const AvisoBloqueado = functions.Aviso(TextoDoBloqueado);

    //Aviso já esta desbloqueado
    const TextoDoDesbloqueado = `❌ O canal de texto já está desbloqueado!`;
    const AvisoDesbloqueado = functions.Aviso(TextoDoDesbloqueado);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const canal = interaction.channel;
    const status = interaction.options.get("status").value;
    const permissions = canal.permissionsFor(interaction.guild.id);

    if (status === "Bloquear") {
      // Verifique se o canal já está bloqueado
      if (!permissions.has(Discord.PermissionFlagsBits.SendMessages)) {
        interaction.reply({ embeds: [AvisoBloqueado], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
      } else {
        await canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false });
        const chatFechado = new Discord.EmbedBuilder()
          .setColor(Bot.Cor)
          .setAuthor({ name: 'Trancado', iconURL: Gif.MiniGifCadeado })
          .setDescription(`**\n🔒 ${interaction.user} Trancou o Chat!\n\n**`)
          .setThumbnail(Gif.PortaFechada)
          .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
        interaction.reply({ embeds: [chatFechado] })
      }
    } else if (status === "Desbloquear") {
      // Verifique se o canal já está desbloqueado
      if (permissions.has(Discord.PermissionFlagsBits.SendMessages)) {
        interaction.reply({ embeds: [AvisoDesbloqueado], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
      } else {
        await canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })
        const chatAberto = new Discord.EmbedBuilder()
          .setColor(Bot.Cor)
          .setAuthor({ name: 'Destrancado', iconURL: Gif.MiniGifCadeado })
          .setDescription(`**\n🔓 ${interaction.user} Destrancou O Chat!\n\n**`)
          .setThumbnail(Gif.AbrindoCadeado)
          .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
        interaction.reply({ embeds: [chatAberto] })
      }
    }


  },
};
