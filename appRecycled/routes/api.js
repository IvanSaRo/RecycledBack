const router = require("express").Router();

const apiUsuariosRouter = require("./api/usuarios");
const apiProductosRouter = require("./api/productos");
const apiMensajesRouter = require("./api/mensajes");
const apiPuntuacionesRouter = require("./api/puntuaciones");

router.use("/usuarios", apiUsuariosRouter);
router.use("/productos", apiProductosRouter);
router.use("/mensajes", apiMensajesRouter);
router.use("/puntuaciones", apiPuntuacionesRouter);

module.exports = router;
