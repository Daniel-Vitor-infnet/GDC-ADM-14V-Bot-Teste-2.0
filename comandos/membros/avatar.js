const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../../estruturas/modulos.js");
const functions = require("../../estruturas/functions_import.js");

module.exports = {
  name: "avatar",
  description: "Disponibiliza o avatar do próprio usuário ou caso escolha outra membro.",
  type: 1,
  options: [
    {
      name: "membro",
      description: "Escolhja um membro para ver o avatar dele.",
      type: 6,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    // Verificar se o comando está bloqueado no banco de dados
    if (await functions.verificaComandoBloqueado(interaction.guildId, interaction.commandName)) {
      interaction.reply({ embeds: [functions.BloqueadoComando(`${interaction.commandName}`, `${interaction.guild.ownerId}`)] })
      return;
    }


    const user = interaction.options.getUser("membro") || interaction.user;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const Avatar = new Discord.EmbedBuilder()
      .setColor(Bot.Cor)
      .setTitle(`📸 Avatar de \`${user.username}\``)
      .setImage(avatar)
      .setDescription(`📶 [Link Para Baixar o Avatar](${avatar})`)
      .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

    interaction.reply({ embeds: [Avatar] });
  },
};




