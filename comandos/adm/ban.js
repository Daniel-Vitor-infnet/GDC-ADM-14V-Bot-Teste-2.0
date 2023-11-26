const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../../estruturas/modulos.js");
const functions = require("../../estruturas/functions_import.js");
const data = functions.dataPersonalizada('L')



module.exports = {
  name: "ban",
  description: "Banir membros pelo ID",
  options: [
    {
      name: 'user',
      description: 'Digite o ID do membro que deseja banir',
      type: 3,
      required: true,
    },
    {
      name: 'motivo',
      description: 'Diga qual motivo vai banir o membro',
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction, args) => {

    const userId = interaction.options.getString('user');
    const motivo = interaction.options.getString('motivo');
    const membro = interaction.guild.members.cache.get(userId);
    const member = interaction.guild.members.cache.get(userId);



    //////////////////////////////////////////////////////////////////////////////////EMBEDS////////////////////////////////////////////////////////////////////////////////////////////////

    //Erro ID
    const TextoDeID = `O membro com o ID fornecido não foi encontrado. Certifique-se de fornecer um ID de membro válido.\n\n vídeo de como pegar Id de membros: https://youtu.be/ZR0rYHvST30`;
    const ErroID = functions.Erro(TextoDeID);

    //Erro Banir
    const TextoDeBanir = `Não foi possível banir o usuário.`;
    const ErroBanir = functions.Erro(TextoDeBanir);

    //Erro Aviso já banido
    const TextoDeJaban = `Este membro já foi banido.`;
    const AvisoJaban = functions.Aviso(TextoDeJaban);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!(interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator) || interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers) || interaction.member.roles.cache.has(GDC.Cargo.ADM))) {
      return interaction.reply({ embeds: [functions.Permissao("Banir membros")], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }

    // Verificar se o ID fornecido é uma sequência numérica válida
    if (!/^\d{17,19}$/.test(userId)) {
      return interaction.reply({ embeds: [ErroID], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }

    // Tentar buscar o usuário
    let user;
    try {
      user = await client.users.fetch(userId, false);
    } catch (error) {
      // Tratar o erro
      return interaction.reply({ embeds: [ErroID], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }

    // Verificar se o usuário existe
    if (!user) {
      return interaction.reply({ embeds: [ErroID], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }

    /*
    // Verificar se o bot tem permissão para banir membros
  if (!interaction.guild.client.user.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
    return interaction.reply({ embeds: [functions.Erro("O bot não tem permissão para banir membros.")], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
  }
  */

    // Verificar se o usuário já está na lista de banidos
    const bans = await interaction.guild.bans.fetch();
    if (bans.some(ban => ban.user.id === userId)) {
      return interaction.reply({ embeds: [AvisoJaban], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }

    if (member) {
      const banCanal = new Discord.EmbedBuilder()
        .setTitle('🔨 Banimento 🔨')
        .setColor(Bot.Cor)
        .setImage(Gif.Ban)
        .setTimestamp()
        .setThumbnail(member.displayAvatarURL())
        .setDescription(`**\n👨🏻‍⚖️ ${interaction.user}, Baniu:**`)
        .addFields(
          { name: '**\n🤵🏻 Membro**', value: `${membro}` },
          { name: '#️⃣ Tag', value: `**\`${membro.discriminator}\`**`, inline: true },
          { name: '🆔 ID', value: `**\`${membro.id}\`**`, inline: true },
          { name: '🛂 Motivo', value: `**\`${motivo}\`**` },
          { name: '🚶🏻 Foi Banido Em:', value: `**\`${data}\`**` }
        )

      interaction.reply({ embeds: [banCanal] })

      //Embed no privado
      const BanPV = new Discord.EmbedBuilder()
        .setTitle('🔨 Você está banido!')
        .setThumbnail(Gif.BanPv)
        .setDescription(`**🔨 Banido Por: ${interaction.user} \n🔨 Do Servidor: \`${interaction.guild.name}\` \n🔨 Motivo: \`${motivo}\` \n🔨 Data: \`${data}\` \`\`\`diff\n- ⚠️ Caso Volte Ao Servidor com outra conta será banido novamente\`\`\`  **`)
        .setColor(Bot.Cor)
        .setTimestamp()
        .setImage(Gif.Vergonha);
      // Enviar mensagem no privado do membro
      member?.send({ embeds: [BanPV] })
        .catch((erro) => {
          // Verificar se o erro é relacionado à impossibilidade de enviar mensagens para o usuário
          if (erro.message.includes('Cannot send messages to this user')) {
            console.log('Erro ao enviar aviso de ban no DM do membro pois é privado');
          } else {
            // Logar o erro ao enviar aviso de ban no DM do membro
            console.log('Erro ao enviar aviso de ban no DM do membro: ' + erro.message || 'Ocorreu um erro.');
          }
        });


      // Obtendo o usuário banido
      const bannedUser = await interaction.guild.members.fetch(userId);

      // Banindo o usuário
      await interaction.guild.members.ban(bannedUser);

      return;
    }


    // Banir o usuário pelo ID
    try {
      await interaction.guild.bans.create(userId);
      return interaction.reply(`O usuário com ID ${userId} foi banido com sucesso.`);
    } catch (error) {
      console.error(error);
      return interaction.reply({ embeds: [ErroBanir], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }
  },
};