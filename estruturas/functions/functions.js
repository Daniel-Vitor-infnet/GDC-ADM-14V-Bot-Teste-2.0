const Discord = require("discord.js")
const Cor = require("../cores");
const Bot = require("../botinfo.js");
const Gif = require("../gifs.js");
const sqlite3 = require("sqlite3").verbose();
const {
  Aviso,
  Aviso2,
  Aviso3,
  Permissao,
  PermissaoNoob,
  PermissaoDono,
  Erro,
  BloqueadoComando,
  BloqueadoComandoPadrao,
} = require("./embedPersonalizados");




module.exports = {



  verificaComandoBloqueado: async function (servidorId, comando, db) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("database_sqlite.db");
      db.get("SELECT Status FROM StatusComandos WHERE ServidorID = ? and Comandos = ? AND Status = 'Desabilitado'", servidorId, comando, (err, row) => {
        if (err) {
          console.error("Erro ao verificar se o comando está bloqueado:", err);
          reject(err);
        } else {
          resolve(!!row);
        }
      });
    });
  },


  verificaComandoBloqueadoPorPadrao: async function (servidorId, servidorNome, comando, interactionExport, Status) {
    const db = new sqlite3.Database("database_sqlite.db");

    db.get("SELECT Status FROM StatusComandos WHERE ServidorID = ? AND Comandos = ?", servidorId, comando, (err, row) => {
      if (err) {
        console.error("Erro ao verificar o status do comando:", err);
        db.close();
      } else {
        if (Status === "Desabilitar") {
          if (row && row.Status === "Desabilitado") {
            db.close();
          } else if (row && row.Status === "Habilitado") {
            db.close();
          } else {
            db.run("INSERT OR REPLACE INTO StatusComandos (Comandos, Status, ServidorID, ServidorNome) VALUES (?, 'Desabilitado', ?, ?)", comando, servidorId, servidorNome, (err) => {
              if (err) {
                console.error("Erro ao Desabilitar o comando:", err);
              } else {
              }
              db.close();
            });
          }
        }
      }
    });

    await interactionExport.deferReply();

    const db3 = new sqlite3.Database("database_sqlite.db");

    let parar = false

    if (await module.exports.verificaComandoBloqueado(servidorId, comando, db3)) {
      interactionExport.followUp({ embeds: [BloqueadoComandoPadrao(`${comando}`, `${interactionExport.guild.ownerId}`)] })
      parar = true
    }

    return parar;
  },



  // Função para notificar o desenvolvedor por mensagem direta (DM)
  notificarNoob: function (importandoNoob, mensagem) {

    if (importandoNoob) {
      importandoNoob.send(mensagem)
        .catch((err) => {
          console.error(`❌ Falha ao enviar mensagem via DM: ${err}`);
        });
    }
  },





  extrairIdCargo: function (cargosBloqueadosFormatados, servidor) {

    const extrairID = (cargosBloqueadosFormatados.match(/\b(\d+)\b/g) || []).map(id => id);
    const cargoBloqueado = extrairID.map(roleId => servidor.guild.roles.cache.get(roleId)).filter(Boolean);

    return cargoBloqueado;
  }







}


