/*
______ _____ _______   _______  _      ___________ 
| ___ \  ___/  __ \ \ / /  __ \| |    |  ___|  _  \
| |_/ / |__ | /  \/\ V /| /  \/| |    | |__ | | | |
|    /|  __|| |     \ / | |    | |    |  __|| | | |
| |\ \| |___| \__/\ | | | \__/\| |____| |___| |/ / 
\_| \_\____/ \____/ \_/  \____/\_____/\____/|___/  
*/
/* La plataforma líder de menudeo entre traperos */

/************ MENSAJE *************/
/***********************************/

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from conversaciones INNER JOIN where ", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pMensajeId => {
  return new Promise((resolve, reject) => {
    //console.log(pMensajeId);
    db.query(
      "select * from mensajes where id_men = ?",
      [pMensajeId],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows[0]);
      }
    );
  });
};
// Aquí saco todos los elementos que necesito de la BBDD para hacer la lista de conversaciones y las id´s que voy a necesitar
const getByUserId = pUsuarioId => {
  //console.log(pUsuarioId);
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id_con, usu1.id AS idcrea, usu1.nombre AS nombrecrea, usu1.foto AS fotocrea, usu1.CCAA AS ccaacrea, usu2.id as idrecibe, usu2.nombre AS nombrerecibe, usu2.foto AS fotorecibe, usu2.CCAA AS ccaarecibe FROM conversaciones CONV INNER JOIN usuarios usu1 ON fk_usuariocrea = usu1.id INNER JOIN usuarios usu2 ON fk_usuariorecibe = usu2.id WHERE (CONV.fk_usuariocrea = ? OR CONV.fk_usuariorecibe = ?)",
      [pUsuarioId, pUsuarioId],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows);
      }
    );
  });
};

const getByUser = (pUsuarioId, pUsuarioRecibeId) => {
  //console.log(pUsuarioId);
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id_con, usu1.id AS idcrea, usu1.nombre AS nombrecrea, usu1.foto AS fotocrea, usu1.CCAA AS ccaacrea, usu2.id as idrecibe, usu2.nombre AS nombrerecibe, usu2.foto AS fotorecibe, usu2.CCAA AS ccaarecibe FROM conversaciones CONV INNER JOIN usuarios usu1 ON fk_usuariocrea = usu1.id INNER JOIN usuarios usu2 ON fk_usuariorecibe = usu2.id WHERE (CONV.fk_usuariocrea = ${pUsuarioId} AND CONV.fk_usuariorecibe = ${pUsuarioRecibeId}) OR (CONV.fk_usuariocrea = ${pUsuarioRecibeId} AND CONV.fk_usuariorecibe = ${pUsuarioId}) `,
      [pUsuarioId, pUsuarioRecibeId],
      (err, result) => {
        if (err) reject(err);

        resolve(result);
      }
    );
  });
};

const getMensajesByConversacion = pConversacionId => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * from mensajes WHERE fk_conversaciones = ?",
      [pConversacionId],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows);
      }
    );
  });
};

const getConversacion = pObjeto => {
  console.log(pObjeto);
  return new Promise((resolve, reject) => {
    var x = `SELECT * FROM conversaciones WHERE fk_usuariocrea =  
    ${pObjeto.idCrea} 
     AND fk_usuariorecibe = 
    ${pObjeto.idRecibe} 
     OR fk_usuariocrea = 
    ${pObjeto.idRecibe} 
     AND fk_usuariorecibe = 
    ${pObjeto.idCrea} 
    `;

    db.query(
      `SELECT * FROM conversaciones WHERE fk_usuariocrea =  
    ${pObjeto.idCrea} 
     AND fk_usuariorecibe = 
    ${pObjeto.idRecibe} 
     OR fk_usuariocrea = 
    ${pObjeto.idRecibe} 
     AND fk_usuariorecibe = 
    ${pObjeto.idCrea} 
    `,
      (err, rows) => {
        console.log(rows);
        if (err) reject(err);
        if (rows.length == 0) {
          idCrea = pObjeto.idCrea
          idRecibe = pObjeto.idRecibe
          crearConversacion(pObjeto.idCrea, pObjeto.idRecibe);
          crearMensaje(pObjeto.idCrea, pObjeto.idRecibe)
        }

        resolve(rows);
      }
    );
  });
};

const crearConversacion = (idCrea, idRecibe) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO conversaciones (fk_usuariocrea, fk_usuariorecibe ) VALUES (${idCrea}, ${idRecibe})`,

      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const crearMensaje = (idCrea, idRecibe) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO mensajes (fk_conversaciones, fk_usuario) SELECT id_con, fk_usuariocrea FROM conversaciones
WHERE fk_usuariocrea= ${idCrea} AND fk_usuariorecibe=${idRecibe}`,

      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};


const create = ({ texto, fk_conversaciones, fk_usuario }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO mensajes (texto, fk_conversaciones, fk_usuario) VALUES (? , ?, ?);",
      [texto, fk_conversaciones, fk_usuario],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
//borrar conversaciones por su ID
const deleteById = pMensajeId => {
  console.log(pMensajeId);
  return new Promise((resolve, reject) => {
    db.query(
      "delete from conversaciones where id_con = ?",
      [pMensajeId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  deleteById: deleteById,
  getByUserId: getByUserId,
  getMensajesByConversacion: getMensajesByConversacion,
  getConversacion: getConversacion,
  getByUser: getByUser,
  crearMensaje: crearMensaje
};
