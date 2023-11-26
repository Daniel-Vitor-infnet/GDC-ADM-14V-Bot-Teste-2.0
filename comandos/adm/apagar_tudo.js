const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../../estruturas/modulos.js");
const functions = require("../../estruturas/functions_import.js");

module.exports = {
  name: "apagar_tudo",
  description: "Limpe o canal de texto (Apaga qualquer mensagem)",
  type: 1,
  options: [
    {
      name: 'quantidade',
      description: 'Número de mensagens para serem apagadas. Escolha entre 1 e 99',
      type: 10,
      required: true,
    },
    {
      name: "motivo",
      description: "Insira por qual motivo você esta usando esse comando.",
      type: 3,
      required: true,
    }
  ],

  run: async (client, interaction) => {
    // Verificar se o comando está bloqueado no banco de dados
    if (await functions.verificaComandoBloqueado(interaction.guildId, interaction.commandName)) {
      interaction.reply({ embeds: [functions.BloqueadoComando(`${interaction.commandName}`, `${interaction.guild.ownerId}`)] })
      return;
    }

    //////////////////////////////////////////////////////////////////////////////////EMBEDS////////////////////////////////////////////////////////////////////////////////////////////////

    //Erro Quantidade
    const TextoDeQuantidade = `\n Você só pode escolher um inteiro número entre 1 e 99. Utilize /apagar [1 - 99]`;
    const ErroQuantidade = functions.Erro(TextoDeQuantidade);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const numero = interaction.options.getNumber('quantidade');
    const motivo = interaction.options.getString('motivo');


    if (!(interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator) || interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages))) {
      return interaction.reply({ embeds: [functions.Permissao("Gerenciar mensagens.")], ephemeral: true }).then(response => setTimeout(() => response.delete(), 120000)).catch(console.error);
    }


    // Verifica se o número de mensagens está dentro do intervalo válido
    if (numero < 1 || numero > 99) {
      interaction.reply({ embeds: [ErroQuantidade], ephemeral: true }).then(response => setTimeout(() => response.delete(), 40000)).catch(console.error);
    } else {
      // Obtém as mensagens a serem excluídas, excluindo as próprias mensagens do bot e Staff
      const messages = await interaction.channel.messages.fetch({ limit: parseInt(numero) });
      const messagesToDelete = messages.filter(
        (msg) => true
      );

      const totalMensagens = messagesToDelete.size; // Obtenha o valor total de mensagens a serem deletadas

      const Apagou = new Discord.EmbedBuilder()
        .setColor(Bot.Cor)
        .setAuthor({ name: '🗑 Limpou o chat 🗑' })
        .setDescription(`**\n${interaction.user} Deletou: \`\`0\`\` mensagens de um total de \`\`${totalMensagens}\`\` mensagens \n\`\`\`fix\n○○○○○○○○○○ 0% \`\`\` \n**`)
        .setThumbnail(Gif.Clear)
        .setFooter({ text: `${interaction.user.username}  🆔(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      // Resposta inicial com o embed Apagou
      interaction.reply({ embeds: [Apagou] }).then(async (response) => {
        const responseMessage = response;

        let mensagensDeletadas = 0;

        // Loop para deletar mensagens e atualizar o embed Apagou
        for (const msg of messagesToDelete.values()) {
          await msg.delete();
          mensagensDeletadas++;

          // Calcular o progresso usando "◉◉◉" para porcentagem apagada e "○○○" para o que falta
          const progresso = (mensagensDeletadas / totalMensagens) * 100;
          const numBarras = Math.floor(progresso / 10); // Cada "◉◉◉" representa 10%
          const barrasApagadas = '◉'.repeat(numBarras);
          const barrasRestantes = '○'.repeat(10 - numBarras);
          Apagou.setDescription(`**\n${interaction.user} Deletou: \`\`${mensagensDeletadas}\`\` mensagens de um total de \`\`${totalMensagens}\`\` mensagens \n\`\`\`fix\n${barrasApagadas}${barrasRestantes} ${progresso.toFixed(2)}%\`\`\` \`\`\`diff\n- Esse processo pode levar até 5 minutos. Por favor aguarde!!!  \`\`\` \n**`);
          responseMessage.edit({ embeds: [Apagou] }); // Atualize o embed na resposta original

          // Verifique se todas as mensagens foram deletadas
          if (mensagensDeletadas === totalMensagens) {
            // Todas as mensagens foram deletadas, atualize a mensagem
            Apagou.setDescription(`**\n${interaction.user} Deletou: \`\`${mensagensDeletadas}\`\` mensagens de um total de \`\`${totalMensagens}\`\` mensagens. \n\`\`\`fix\n Motivo: ${motivo} \`\`\` **`);
            responseMessage.edit({ embeds: [Apagou] }); // Atualize o embed na resposta original
          }
        }
      }).catch(console.error);
    }
  }

}



