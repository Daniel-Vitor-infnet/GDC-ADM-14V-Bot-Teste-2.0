const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate", // Nome do evento
  execute(client, interaction) { // Adicione 'client' como parâmetro
    if (interaction.isCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) 
      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
      cmd.run(client, interaction);
    }
  },
};