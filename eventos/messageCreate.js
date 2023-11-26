module.exports = {
  name: "messageCreate",
  execute(message) {
    if (!message.guild || message.author.bot) return;

    // Seu código para lidar com mensagens em servidores
    // Exemplo: if (message.content.startsWith("/comando")) { /* Ação do comando */ }
  },
};