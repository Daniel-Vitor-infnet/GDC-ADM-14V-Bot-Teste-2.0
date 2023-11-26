const { Discord, sqlite3, Cor, Bot, Gif, GDC } = require("../modulos");
const functions = require("../functions_import.js");
const Emoji = require("./emoji");


const selection = {

    MenuInicial: new Discord.ActionRowBuilder().addComponents(new Discord.StringSelectMenuBuilder()
        .setCustomId("MenuInicial_ajuda")
        .setPlaceholder("Meus Comandos")
        .addOptions(

            {
                label: "STAFF",
                description: "Veja meus comandos para Administração.",
                emoji: `${Emoji.Staff}`,
                value: "Administração"
            },
            {
                label: "Dono Do Servidor",
                description: "Veja meus comandos para Dono.",
                emoji: `${Emoji.Dono}`,
                value: "Dono"
            },
            {
                label: "Membros",
                description: "Veja meus comandos para Membros.",
                emoji: `${Emoji.Membros}`,
                value: "Membros"
            },
        )
    ),




    Staff: new Discord.ActionRowBuilder().addComponents(new Discord.StringSelectMenuBuilder()
        .setCustomId("Administração_ajuda")
        .setPlaceholder("Selecione um comando de Administração")
        .addOptions(
            {
                label: "Menu Inicial",
                description: "Volte para o menu inicial",
                emoji: `${Emoji.MenuInicial}`,
                value: "Menu Inicial"
            },
            {
                label: "Apagar Tudo",
                description: "Apaga qualquer mensagem do chat",
                emoji: `${Emoji.Staff}`,
                value: "apagar_tudo",
            },
            {
                label: "Apagar",
                description: "Apaga mensagens do chat",
                emoji: `${Emoji.Staff}`,
                value: "apagar"
            },
            {
                label: "Banir",
                description: "Banir qualquer membro do discord no servidor",
                emoji: `${Emoji.Staff}`,
                value: "ban"
            },
            {
                label: "Embed Custom",
                description: "Enviar embed personalizados",
                emoji: `${Emoji.Staff}`,
                value: "embed_custom"
            },
            {
                label: "Gerenciar Chat",
                description: "Bloquear ou Desbloquear chats",
                emoji: `${Emoji.Staff}`,
                value: "gerenciar_chat"
            },
        )
    ),


    Dono: new Discord.ActionRowBuilder().addComponents(new Discord.StringSelectMenuBuilder()
        .setCustomId("Dono_ajuda")
        .setPlaceholder("Selecione um comando de Dono")
        .addOptions(
            {
                label: "Menu Inicial",
                description: "Volte para o menu inicial",
                emoji: `${Emoji.MenuInicial}`,
                value: "Menu Inicial"
            },
            {
                label: "Gerenciar Cargos",
                description: "Desative e Ative cargos automáticos no seu servidor",
                emoji: `${Emoji.Dono}`,
                value: "gerenciar_cargos",
            },
            {
                label: "Gerenciar Comandos",
                description: "Desative e Ative comandos no seu servidor",
                emoji: `${Emoji.Dono}`,
                value: "gerenciar_comandos",
            },
            {
                label: "Gerenciar Eventos",
                description: "Desative e Ative eventos no seu servidor",
                emoji: `${Emoji.Dono}`,
                value: "gerenciar_eventos",
            },
            {
                label: "Gerenciar Post",
                description: "Desative e Ative eventos no seu servidor",
                emoji: `${Emoji.Dono}`,
                value: "gerenciar_post"
            },
        )
    ),




    Membros: new Discord.ActionRowBuilder().addComponents(new Discord.StringSelectMenuBuilder()
        .setCustomId("Membros_ajuda")
        .setPlaceholder("Selecione um comando de Membros")
        .addOptions(
            {
                label: "Menu Inicial",
                description: "Volte para o menu inicial",
                emoji: `${Emoji.MenuInicial}`,
                value: "Menu Inicial"
            },
            {
                label: "Ajuda",
                description: "Comando para ver todos comandos do bot",
                emoji: `${Emoji.Membros}`,
                value: "ajuda",
            },
            {
                label: "Avatar",
                description: "Veja seu próprio avatar ou de outro membro",
                emoji: `${Emoji.Membros}`,
                value: "avatar"
            },
            {
                label: "Info Bot",
                description: "Veja todas informações do bot",
                emoji: `${Emoji.Membros}`,
                value: "info_bot"
            },
            {
                label: "Info Membro",
                description: "Veja todas informações de um membro",
                emoji: `${Emoji.Membros}`,
                value: "info_membro"
            },
            {
                label: "Info Server",
                description: "Veja todas informações do servidor",
                emoji: `${Emoji.Membros}`,
                value: "info_server"
            },
        )
    ),






};

module.exports = selection;

