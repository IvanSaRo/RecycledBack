const router = require("express").Router();

const Mensaje = require("../../models/mensaje");

// Aquí irían los Middlewares

// GET http://localhost:3000/api/mensajes/
// Método GET para conseguir la Api con Jsons
router.get("/", async (req, res) => {
  // console.log(req.payload);
  const rows = await Mensaje.getAll();
  res.json(rows);
});

/* // GET http://localhost:3000/api/mensajes/:mensajeId
// Método GET para conseguir un solo mensaje con la Api
router.get("/:mensajeId", async (req, res) => {
  const mensaje = await Mensaje.getById(req.params.mensajeId);
  res.json(mensaje);
}); */

// GET http://localhost:3000/api/mensajes/:mensajeId
// Método GET para conseguir todos los mensajes de un usuario

router.get("/:usuarioId", async (req, res) => {

  const conversaciones = await Mensaje.getByUserId(req.params.usuarioId);
  //console.log("hola");
  //if (conversaciones.rows > 0) {
  for (let conversacion of conversaciones) {
    const mensajes = await Mensaje.getMensajesByConversacion(
      conversacion.id_con
    );
    conversacion.mensajes = mensajes;
  }
  res.json(conversaciones);
  // }
});

// GET http://localhost:3000/api/mensajes/:usuarioId/:usuarioRecibe
// Método GET para conseguir UN mensaje de un usuario

router.get("/:usuarioId/:usuarioRecibe", async (req, res) => {

  console.log('params' + req.params.usuarioId, req.params.usuarioRecibe);

  const conversaciones = await Mensaje.getByUser(req.params.usuarioId, req.params.usuarioRecibe);
  console.log(conversaciones.id_con)
  const mensajes = await Mensaje.getMensajesByConversacion(
    conversaciones[0].id_con
  );
  conversaciones[0].mensajes = mensajes;

  res.json(conversaciones);

});

// GET http://localhost:3000/api/mensajes/check
// Método GET para comprobar si existe una conversación
router.get("/check/:idCrea/:idRecibe", async (req, res) => {
  console.log("hola", req.params);
  const result = await Mensaje.getConversacion(req.params);
  console.log("adios", result);
  res.json(result);

  /*  for (let conversacion of result) {
    const mensajes = await Mensaje.getMensajesByConversacion(
      conversacion.id_con
    );
    conversacion.mensajes = mensajes;
  } */
});

// POST http://localhost:3000/api/mensajes/
// Método POST para crear un mensaje nuevo
router.post("/", async (req, res) => {
  const result = await Mensaje.create(req.body);
  // console.log(result["insertId"]);
  if (result["affectedRows"] === 1) {
    const mensaje = await Mensaje.getById(result["insertId"]);
    res.json(mensaje);
  } else {
    res.json({ error: "El mensaje no se ha insertado" });
  }
});

// DELETE http://localhost:3000/api/mensajes/
// Método DELETE para borrar un mensaje
router.delete("/", async (req, res) => {
  console.log(req.body.idcon);
  const result = await Mensaje.deleteById(req.body.idcon);
  // console.log(result);
  if (result["affectedRows"] === 1) {
    res.json({ success: "El mensaje ha sido erradicado" });
  } else {
    res.json({ error: "El mensaje NO ha sido destruido" });
  }
});

module.exports = router;
