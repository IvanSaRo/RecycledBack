const router = require("express").Router();

const Producto = require("../../models/producto");

// Aquí irían los Middlewares

// GET http://localhost:3000/api/productos/
//Método GET para conseguir la Api con Jsons
router.get("/", async (req, res) => {
  // console.log(req.payload);
  const rows = await Producto.getAll();
  //console.log(rows);
  res.json(rows);
});

// GET http://localhost:3000/api/productos/:productoNombre
//Método GET para conseguir productos por nombre
router.get("/nombres/:productoNombre", async (req, res) => {
  // console.log(req.payload);

  const rows = await Producto.getByName(req.params.productoNombre);
  //console.log(rows);
  res.json(rows);
});

// GET http://localhost:3000/api/productos/usuarios/:usuarioId
//Método GET para conseguir productos por id de usuario
router.get("/usuarios/:usuarioId", async (req, res) => {
  const rows = await Producto.getByUser(req.params.usuarioId);
  //console.log(rows);
  res.json(rows);
});

// GET http://localhost:3000/api/productos/:productoId
// Método GET para conseguir un solo producto con la Api
router.get("/:productoId", async (req, res) => {
  const producto = await Producto.getById(req.params.productoId);
  res.json(producto);
});

// GET http://localhost:3000/api/productos/tipo
router.get("/tipo/:tipo", async (req, res) => {
  const rows = await Producto.getByTipo(req.params.tipo);
  res.json(rows);
});

// GET http://localhost:3000/api/productos/categoria
router.get("/categoria/:categoria", async (req, res) => {
  const rows = await Producto.getByCategoria(req.params.categoria);
  res.json(rows);
});

// GET http://localhost:3000/api/productos/categoria/productos
router.get("/categoria/productos", async (req, res) => {
  //console.log(req.payload);
  const rows = await Producto.getProductos();
  res.json(rows);
});

// GET http://localhost:3000/api/productos/categoria/materiales
router.get("/categoria/materiales/", async (req, res) => {
  //console.log(req.payload);
  const rows = await Producto.getMateriales();
  res.json(rows);
});

// POST http://localhost:3000/api/productos/new
// Método POST para crear un productos nuevo
router.post("/new", async (req, res) => {
  const result = await Producto.create(req.body);
  if (result["affectedRows"] === 1) {
    const producto = await Producto.getById(result["insertId"]);
    res.json(producto);
  } else {
    res.json({ error: "El producto no se ha insertado" });
  }
});

// POST http://localhost:3000/api/productos/edit
// Método POST para modificar un producto
router.post("/edit", async (req, res) => {
  const result = await Producto.update(req.body);
  if (result["affectedRows"] === 1) {
    const producto = await Producto.getById(result["insertId"]);
    res.json(producto);
  } else {
    res.json({ error: "El producto no se ha insertado" });
  }
});

// POST http://localhost:3000/api/productos/editstatus
// Método POST para modificar el status de un producto
router.post("/editstatus", async (req, res) => {
  const result = await Producto.updateStatus(req.body);

  if (result["affectedRows"] === 1) {
    const producto = await Producto.getById(result["insertId"]);
    res.json(producto);
  } else {
    res.json({ error: "El producto no se ha modificado" });
  }
});

// DELETE http://localhost:3000/api/productos/delete
// Método DELETE para borrar un productos
router.delete("/delete/:id_prod", async (req, res) => {
  const result = await Producto.deleteById(req.params.id_prod);
  if (result["affectedRows"] === 1) {
    res.json({ success: "El producto ha sido erradicado" });
  } else {
    res.json({ error: "El producto NO ha sido destruido" });
  }
});

module.exports = router;
