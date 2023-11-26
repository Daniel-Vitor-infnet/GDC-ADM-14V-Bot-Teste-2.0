const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../../estruturas/modulos.js");
const functions = require("../../estruturas/functions_import.js");

module.exports = {
  name: "embed_custom", // Nome do comando
  description: "Comando para Testes", // Descrição do comando
  type: 1,
  options: [
    {
      name: "tipo",
      description: "Escolha o tipo de embed que deseja",
      type: 3,
      required: true,
      choices: [
        { name: "Embed Comum", value: "EmbedPadrão" },
        { name: "Mencia o membro escolhido", value: "EmbedMenção" },
        { name: "Mensagem Comum (Sem Embed)", value: "MensagemComum" },
        { name: "Embed No Privado Do Membro", value: "EmbedPV" },
        { name: "Embed para anuncio do servidor", value: "EmbedServidor" },
      ],
    },
    {
      name: "menssagem_personalizada",
      description: "Insira a menssagem que irá paracer no embed.",
      type: 3,
      required: true,
    },
    {
      name: "membro",
      description: "Mencione caso necessário",
      type: 6,
      required: false,
    },
  ],
  run: async (client, interaction) => {

    const info = {
      Tipo: interaction.options.get('tipo').value,
      MenssagemPersonalizada: interaction.options.getString('menssagem_personalizada'),
      Membro: interaction.options.getUser("membro"),
    }

    const membro = info.Membro
    //////////////////////////////////////////////////////////////////////////////////EMBEDS////////////////////////////////////////////////////////////////////////////////////////////////

    //Aviso de Menção
    const TextoDeMencionar = `Você deve escolher a opção de menciar um membro para usar esse embed`;
    const AvisoMencionar = functions.Aviso(TextoDeMencionar);

    //Aviso de mensagem enviada com sucesso
    const TextoDeDMSucesso = `Mensagem enviada com sucesso no privado(DM) do membro ${info.Membro}!`;
    const AvisoDMSucesso = functions.Aviso(TextoDeDMSucesso);

    //Erro Mensamge do privado
    const TextoDeDMPrivado = `O membro ${info.Membro} não permite menssagens no privado`;
    const ErroDMPrivado = functions.Erro(TextoDeDMPrivado);



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!(interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator) || interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages))) {
      return interaction.reply({ embeds: [functions.Permissao("Gerenciar mensagens.")], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }


    if (info.Tipo === "EmbedPadrão") {

      const EmbedPadrão = new Discord.EmbedBuilder()
        .setColor(Bot.Cor)
        .setTitle(`📢 Anuncio 📢 `)
        .setDescription(`**${info.MenssagemPersonalizada}**`)
        .setThumbnail(Bot.Foto)
        .setImage(Gif.Anuncio)
        .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();
      interaction.reply({ embeds: [EmbedPadrão] });

    } else if (info.Tipo === "EmbedMenção") {
      if (membro === null) {
        return interaction.reply({ embeds: [AvisoMencionar], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
      } else {
        const EmbedMencao = new Discord.EmbedBuilder()
          .setColor(Bot.Cor)
          .setTitle(`📢 Anuncio para você \`${membro.username}\``)
          .setDescription(`**${info.MenssagemPersonalizada}**`)
          .setThumbnail(Gif.Anuncio)
          .setImage(membro.displayAvatarURL({ dynamic: true, format: "png", size: 128 }))
          .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp();
        interaction.reply({ embeds: [EmbedMencao], content: `${membro}` });
      }
    } else if (info.Tipo === "MensagemComum") {
      interaction.reply({ content: info.MenssagemPersonalizada });
    } else if (info.Tipo === "EmbedPV") {
      if (membro === null) {
        return interaction.reply({ embeds: [AvisoMencionar], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
      } else {
        const ft = interaction.guild.iconURL({ dynamic: true, size: 1024 }) || Gif.SemImagem;
        const EmbedPV = new Discord.EmbedBuilder()
          .setColor(Bot.Cor)
          .setTitle(`📢 Anuncio para você do servidor \`${interaction.guild.name}\``)
          .setDescription(`**${info.MenssagemPersonalizada}**`)
          .setThumbnail(ft)
          .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp();
        // Verifica se o membro pode receber mensagens diretas e envia a mensagem
        membro?.send({ embeds: [EmbedPV] })
          .then(() => interaction.reply({ embeds: [AvisoDMSucesso], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error))
          .catch((erro) => {
            if (erro.message.includes('Cannot send messages to this user')) {
              interaction.reply({ embeds: [ErroDMPrivado], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
            } else {
              //Erro Geral
              const TextoDeGeral = 'Erro ao enviar mensagem: ' + erro.message || 'Ocorreu um erro.';
              const ErroGeral = functions.Erro(TextoDeGeral);
              interaction.reply({ embeds: [ErroGeral], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
            }
          });

      }
    } else if (info.Tipo === "EmbedServidor") {
      const ft = interaction.guild.iconURL({ dynamic: true, size: 1024 }) || Gif.SemImagem;
      const EmbedServidor = new Discord.EmbedBuilder()
        .setColor(Bot.Cor)
        .setTitle(`📢 Anuncio importante do servidor \`${interaction.guild.name}\``)
        .setDescription(`**${info.MenssagemPersonalizada}**`)
        .setThumbnail(ft)
        .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();
      interaction.reply({ embeds: [EmbedServidor] });
    }



  },
};
