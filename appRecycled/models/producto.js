/*
______ _____ _______   _______  _      ___________ 
| ___ \  ___/  __ \ \ / /  __ \| |    |  ___|  _  \
| |_/ / |__ | /  \/\ V /| /  \/| |    | |__ | | | |
|    /|  __|| |     \ / | |    | |    |  __|| | | |
| |\ \| |___| \__/\ | | | \__/\| |____| |___| |/ / 
\_| \_\____/ \____/ \_/  \____/\_____/\____/|___/  
*/
/* La plataforma líder de menudeo entre traperos */

/************ PRODUCTO *************/
/***********************************/

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from productos", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        //  console.log(rows);
        resolve(rows);
      }
    });
  });
};

const getById = pProductoId => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT productos.*, u.id, u.CCAA, u.foto, u.nombre, u.apellidos FROM usuarios as u INNER JOIN productos ON u.id = productos.fk_usuarios where id_prod = ?",
      [pProductoId],
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

/* GET BY NAME */
const getByName = pName => {
  return new Promise((resolve, reject) => {
    db.query(
      // Perestroika
      'SELECT productos.*, u.id, u.CCAA, u.foto, u.nombre, u.apellidos FROM usuarios as u INNER JOIN productos ON u.id = productos.fk_usuarios where titulo like "%' +
      pName +
      '%" or descripcion like "%' +
      pName +
      '%"',

      (err, rows) => {
        //  console.log(rows);
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows);
      }
    );
  });
};

const getByTipo = pTipo => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT productos.*, u.id, u.CCAA, u.foto, u.nombre, u.apellidos FROM usuarios as u INNER JOIN productos ON u.id = productos.fk_usuarios WHERE productos.tipo =  ?",
      [pTipo],
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

const getByUser = pId => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT productos.*, usuarios.*  FROM usuarios INNER JOIN productos ON usuarios.id = productos.fk_usuarios WHERE usuarios.id = ?",
      [pId],
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

const getByCategoria = pCat => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT productos.*, u.id, u.CCAA, u.foto, u.nombre, u.apellidos FROM usuarios as u INNER JOIN productos ON u.id = productos.fk_usuarios WHERE productos.categoria =  ?",
      [pCat],
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

const getProductos = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM productos WHERE categoria = producto",
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          //    console.log(rows);
          resolve(rows);
        }
      }
    );
  });
};

const getMateriales = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from productos where categoria = material",
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          //     console.log(rows);
          resolve(rows);
        }
      }
    );
  });
};

const create = ({
  titulo,
  descripcion,
  precio,
  categoria,
  tipo,
  imagen,
  fk_usuarios,
  id_foto
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into productos (titulo, descripcion, precio, categoria, tipo, imagen, fk_usuarios, id_foto) values (?,?,?,?,?,?,?,?)",
      [titulo, descripcion, precio, categoria, tipo, imagen, fk_usuarios, id_foto],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const update = ({ titulo, descripcion, precio, imagen, id_prod }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE productos SET titulo =?, descripcion=?, precio=?, imagen=? WHERE id_prod = ?",
      [titulo, descripcion, precio, imagen, id_prod],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const updateStatus = ({ estatus, id_prod }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE productos SET estatus =? WHERE id_prod = ?",
      [estatus, id_prod],
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
      "delete from productos where id_prod = ?",
      [pProductoId],
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
  getByName: getByName,
  create: create,
  deleteById: deleteById,
  getByTipo: getByTipo,
  getByCategoria: getByCategoria,
  getProductos: getProductos,
  getMateriales: getMateriales,
  getByUser: getByUser,
  update: update,
  updateStatus: updateStatus
};
