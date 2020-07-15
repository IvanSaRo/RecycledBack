const router = require("express").Router();
const bcrypt = require("bcryptjs"); // REQUERIMOS LA LIB DE HASH
const jwt = require("jwt-simple"); // REQUIERO LA LIB JWT PARA LA CREACIÓN DE TOKENS
const moment = require("moment"); // REQUERIMOS LA LIB MOMENT PARA MANEJO DE FECHAS
const middlewares = require("../middlewares"); // Carga el archivo de middlewares

const Usuario = require("../../models/usuario");

// Aquí irían los Middlewares

// GET http://localhost:3000/api/usuarios/
// Método GET para conseguir la Api con Jsons
router.get("/", async (req, res) => {
  //console.log(req.payload);
  const rows = await Usuario.getAll();
  res.json(rows);
});

// POST http://localhost:3000/api/usuarios/register
// Método POST para crear un usuarios nuevo
router.post("/register", async (req, res) => {
  // HASHEO DE LA CONTRASEÑA
  const passwordEnc = bcrypt.hashSync(req.body.password, 10); // El 10 es el nº de veces que encripta
  req.body.password = passwordEnc;

  const user = await Usuario.emailExists(req.body.email);
  if (!user) {
    const result = await Usuario.create(req.body);
    if (result["affectedRows"] === 1) {
      const usuario = await Usuario.getById(result["insertId"]);
      res.json(usuario);
    }
  } else {
    res.json({ error: "El usuario no se ha insertado" });
  }
});

// DELETE http://localhost:3000/api/usuarios/
// Método DELETE para borrar un usuarios
router.delete("/:usuarioId", async (req, res) => {
  const result = await Usuario.deleteById(req.params.usuarioId);
  //console.log(req.params.usuarioId);
  if (result["affectedRows"] === 1) {
    res.json({ success: "El usuario ha sido erradicado" });
  } else {
    res.json({ error: "El usuario NO ha sido destruido" });
  }
});

//PUT http://localhost:3000/api/clientes/:pClienteId
router.put("/:usuarioId", async (req, res) => {
  const result = await Usuario.update(req.body, req.params.usuarioId)
    .then(result => res.json(result))
    .catch(err => {
      res.json({ error: "No se ha podido editar el cliente" });
    });
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await Usuario.emailExists(req.body.email);
    if (!user) {
      return res.status(401).json({ error: "Error en email y/o password" });
    }
    const iguales = bcrypt.compareSync(req.body.password, user.password); // Compara la pass introducida con la pass hasheada en la bbdd
    if (iguales) {
      res.json({ success: createToken(user), id: user.id });
    } else {
      return res.status(401).json({ error: "Error en email y/o password" });
    }
  } catch (err) {
    console.log(err);
  }
});

// CREA EL TOKEN A PARTIR DE UN USUARIO
const createToken = pUser => {
  const payload = {
    usuarioId: pUser.id
    // fechaCreacion: moment().unix(),
    // fechaExpiracion: moment().add(1, 'hour').unix()
  };

  return jwt.encode(payload, process.env.SECRET_KEY); // MIRAR ARCHIVO .env para entender 2º param
};

// router.use(middlewares.checkToken) // Antes de que se ejecuten las funciones de abajo, pasa por aqui

// GET http://localhost:3000/api/usuarios/:usuarioId
// Método GET para conseguir un solo usuario con la Api
router.get("/:usuarioId", async (req, res) => {
  const cliente = await Usuario.getById(req.params.usuarioId);
  res.json(cliente);
  console.log(middlewares.checkToken.payload);
});

/// ID USUARIO QUE ESTÁ LOGADO
router.get("/usuario/:usuarioId", middlewares.checkToken, async (req, res) => {
  const cliente = await Usuario.getById(req.payload.usuarioId);
  res.json(cliente);
  console.log(middlewares.checkToken.payload);
});

// POST http://localhost:3000/api/usuarios/email/:usuarioMail
// Método POST para saber si el mail existe
router.post("/email", async (req, res) => {
  const cliente = await Usuario.emailExists(req.body.email);
  res.json(cliente);
});
// POST http://localhost:3000/api/usuarios/edit
// Actualiza el usuario
router.post("/edit", async (req, res) => {
  const result = await Usuario.update(req.body);
  if (result["affectedRows"] === 1) {
    const usuario = await Usuario.getById(result["insertId"]);
    res.json(usuario);
  } else {
    res.json({ error: "El usuario no se ha actualizado" });
  }
});

// POST http://localhost:3000/api/usuarios/fav
// Actualiza los fav del usuario
router.post("/fav", async (req, res) => {
  const result = await Usuario.updateFav(req.body);
  if (result["affectedRows"] === 1) {
    const usuario = await Usuario.getById(result["insertId"]);
    res.json(usuario);
  } else {
    res.json({ error: "El usuario no se ha actualizado" });
  }
});

module.exports = router;
