const Discord = require("discord.js")
const config = require("./config.json")
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ]
});

const path = require('node:path');
const fs = require("fs")
const Cor = require("./estruturas/cores.js");
const Bot = require("./estruturas/botinfo.js");
const Gif = require("./estruturas/gifs.js");
const akinator = require("discord.js-akinator");
const eventFiles = [
  "ready",
  "interactionCreate",
  "messageCreate",
];
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("comandos_bloqueados.db");

// Cria a tabela de bloqueio de comandos se ela não existir
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS StatusCommands (ServidorNome TEXT, ServidorID TEXT, Comandos TEXT, Status TEXT, PRIMARY KEY (ServidorID, Comandos))");
});

db.close();




module.exports = client;

// Registre os Eventos
for (const eventFile of eventFiles) {
  const event = require(`./Eventos/${eventFile}`);
  const eventName = eventFile.replace(/\.(js|ts)$/, ""); // Remove a extensão do arquivo

  if (eventName === "interactionCreate") {
    client.on(eventName, event.execute.bind(null, client));
  } else {
    client.on(eventName, (...args) => event.execute(...args, client));
  }
}




client.slashCommands = new Discord.Collection()
client.categories = fs.readdirSync("./comandos/");

["comandos"].forEach(handler => {
  require(`./Eventos/reloadercommand`)(client);
});



client.login(config.token)