/*
______ _____ _______   _______  _      ___________
| ___ \  ___/  __ \ \ / /  __ \| |    |  ___|  _  \
| |_/ / |__ | /  \/\ V /| /  \/| |    | |__ | | | |
|    /|  __|| |     \ / | |    | |    |  __|| | | |
| |\ \| |___| \__/\ | | | \__/\| |____| |___| |/ /
\_| \_\____/ \____/ \_/  \____/\_____/\____/|___/
*/
/* La plataforma líder de menudeo entre traperos */

/************ PUNTUACION *************/
/***********************************/
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from valoraciones", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
};

const getRateProduct = pProductoId => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT valoracion, id_user, id_prod FROM valoraciones where id_prod = ?",
            [pProductoId],
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

const rateProduct = ({ id_user, id_prod, valoracion }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into valoraciones (id_user, id_prod, valoracion) values (?,?,?)",
            [id_user, id_prod, valoracion],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });
};


const getRateUser = pUserId => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT valoracion, id_user, id_user2 FROM valoraciones where id_user2 = ? AND valoraciones.valoracion IS NOT NULL",
            [pUserId],
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

const getValoraciones = pTipo => {
    return new Promise((resolve, reject) => {
        db.query("SELECT valoraciones.resenia, valoraciones.date, u.id, u.foto, u.nombre, u.apellidos FROM usuarios as u INNER JOIN valoraciones ON u.id = valoraciones.id_user WHERE valoraciones.id_user2 =  ? AND valoraciones.resenia IS NOT NULL", [pTipo], (err, rows) => {
            if (err) reject(err);
            if (rows.length === 0) {
                resolve(null);
            }
            resolve(rows);
        });
    });
};

const nuevaValoracion = ({ id_user, id_user2, resenia }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into valoraciones (id_user, id_user2, resenia) values (?,?,?)",
            [id_user, id_user2, resenia],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });
};


const rateUser = ({ id_user, id_user2, valoracion }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into valoraciones (id_user, id_user2, valoracion) values (?,?,?)",
            [id_user, id_user2, valoracion],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });
};


module.exports = {
    getRateProduct: getRateProduct,
    getAll: getAll,
    rateProduct: rateProduct,
    getRateUser: getRateUser,
    rateUser: rateUser,
    getValoraciones: getValoraciones,
    nuevaValoracion: nuevaValoracion
}