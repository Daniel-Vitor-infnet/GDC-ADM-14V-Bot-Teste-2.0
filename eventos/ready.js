const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../estruturas/modulos.js");
const functions = require("../estruturas/functions_import.js");
const { ActivityType } = require('discord.js');


module.exports = {
  name: "ready",
  once: true, // Certifique-se de que este evento seja executado apenas uma vez quando o bot iniciar
  execute(client) {
    console.log(`🔥 Estou online! || ${functions.dataDefault()}`);

    // Defina o status do bot
    client.user.setPresence({
      activities: [{ name: `/ajuda para dúvidas`, type: ActivityType.Custom }], // Você pode usar PLAYING, WATCHING, LISTENING, STREAMING, COMPETING. CUSTOM 
      status: 'online', //dnd = ocupado Online Invisible 
    });
  },
};