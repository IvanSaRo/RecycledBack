/*
______ _____ _______   _______  _      ___________ 
| ___ \  ___/  __ \ \ / /  __ \| |    |  ___|  _  \
| |_/ / |__ | /  \/\ V /| /  \/| |    | |__ | | | |
|    /|  __|| |     \ / | |    | |    |  __|| | | |
| |\ \| |___| \__/\ | | | \__/\| |____| |___| |/ / 
\_| \_\____/ \____/ \_/  \____/\_____/\____/|___/  
*/
/* La plataforma líder de menudeo entre traperos */

/************ USUARIO **************/
/***********************************/

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from usuarios", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
};

const getById = pUsuarioId => {
  console.log(pUsuarioId);
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where id = ?",
      [pUsuarioId],
      (err, rows) => {
        console.log(rows);
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows[0]);
      }
    );
  });
};

const create = ({ nombre, apellidos, email, password, CCAA, foto }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into usuarios (nombre, apellidos, email, password, CCAA, foto) values (?,?,?,?,?,?)",
      [nombre, apellidos, email, password, CCAA, foto],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = pProductoId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from usuarios where id = ?",
      [pProductoId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const update = ({ nombre, apellidos, email, CCAA, foto, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE usuarios SET nombre =?, apellidos=?, email=?, CCAA=?, foto=? WHERE id = ?",
      [nombre, apellidos, email, CCAA, foto, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const updateFav = ({ favoritos, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE usuarios SET favoritos =? WHERE id = ?",
      [favoritos, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};



// COMPROBAR EL EMAIL PARA EL LOGIN
const emailExists = pEmail => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where email = ?",
      [pEmail],
      (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  deleteById: deleteById,
  update: update,
  emailExists: emailExists,
  updateFav: updateFav,

};
