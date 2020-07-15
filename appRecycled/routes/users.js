var express = require("express");
var router = express.Router();

const User = require("../models/usuario");
// GET http://localhost:3000
router.get("/", async (req, res, next) => {
  //para usar el modelo
  const rows = await User.getAll(); //aquí usamos un método del modelo para traer el array de estdiantes
  res.render("usuarios/index", { usuarios: rows }); // asi paso el array a students
});
module.exports = router;
