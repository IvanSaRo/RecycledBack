const router = require("express").Router();

const Puntuacion = require("../../models/puntuacion");


// GET http://localhost:3000/api/puntuaciones/
//Método GET ALL 
router.get("/", async (req, res) => {
    const rows = await Puntuacion.getAll();
    console.log(rows);
    res.json(rows);
});



// GET http://localhost:3000/api/puntuaciones/producto/:id_prod
//Método GET para conseguir valoracion del producto
router.get("/producto/:id_prod", async (req, res) => {
    const producto = await Puntuacion.getRateProduct(req.params.id_prod);
    res.json(producto);
});

// POST http://localhost:3000/api/puntuaciones/rateproduct
// Método POST para crear un productos nuevo
router.post("/rateproduct", async (req, res) => {
    const result = await Puntuacion.rateProduct(req.body);
    if (result["affectedRows"] === 1) {
        const producto = await Puntuacion.getRateProduct(result["insertId"]);
        res.json(producto);
    } else {
        res.json({ error: "El producto no se ha valorado" });
    }
});

// GET http://localhost:3000/api/puntuaciones/user/:id_prod
//Método GET para conseguir valoracion del usuario
router.get("/user/:id_user2", async (req, res) => {
    const user = await Puntuacion.getRateUser(req.params.id_user2);
    res.json(user);
});

// GET http://localhost:3000/api/puntuaciones/res/:id_user2
//Método GET para conseguir resenias del usuario
router.get("/res/:id_user2", async (req, res) => {
    const user = await Puntuacion.getValoraciones(req.params.id_user2);
    res.json(user);
});

// POST http://localhost:3000/api/puntuaciones/rateuser
// Método POST para crear un user rate nuevo
router.post("/rateuser", async (req, res) => {
    const result = await Puntuacion.rateUser(req.body);
    if (result["affectedRows"] === 1) {
        const producto = await Puntuacion.getRateUser(result["insertId"]);
        res.json(producto);
    } else {
        res.json({ error: "El usuario no se ha valorado" });
    }
});

// POST http://localhost:3000/api/puntuaciones/comment
// Método POST para crear un coment user nuevo
router.post("/comment", async (req, res) => {
    const result = await Puntuacion.nuevaValoracion(req.body);
    if (result["affectedRows"] === 1) {
        const producto = await Puntuacion.getRateUser(result["insertId"]);
        res.json(producto);
    } else {
        res.json({ error: "El usuario no se ha valorado" });
    }
});



module.exports = router;