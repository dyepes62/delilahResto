const { Router } = require("express");

const {
  verificarAdmin,
  verificarToken,
} = require("../middlewares/validarUsuario");

const router = Router();
const {
  agregarProducto,
  obtenerProductos,
  borrarProducto,
  actualizarProducto,
} = require("../models/models.producto");

router
  .route("/")
  .post(verificarAdmin, async (req, res) => {
    const { producto, precio, urlImagen, descripcion } = req.body;
    await agregarProducto(producto, precio, urlImagen, descripcion);
    res.json({
      sucess: "true",
      message: "El producto ha sido añadido EXITOSAMENTE!",
    });
  })
  .get(verificarToken, async (req, res) => {
    res.json(await obtenerProductos());
  })
  .delete(verificarAdmin, async (req, res) => {
    const nombreProducto = req.query.producto;
    const borradoProducto = await borrarProducto(nombreProducto);
    if (borradoProducto[0].affectedRows === 1) {
      res.json({
        sucess: "true",
        message: "El producto ha sido borrado exitosamente",
      });
    } else {
      res.status(400).json({
        sucess: "false",
        message: "Producto no encontrado",
      });
    }
  })
  .put(verificarAdmin, async (req, res) => {
    const nombreProducto = req.query.producto;
    const { producto, precio, urlImagen, descripcion } = req.body;
    const nuevoProducto = await actualizarProducto(
      producto,
      precio,
      urlImagen,
      descripcion,
      nombreProducto
    );
    if (nuevoProducto) {
      res.json({
        sucess: "true",
        message: "El producto ha sido actualizado exitosamente",
      });
    } else {
      res.status(400).json({
        sucess: "false",
        message: "Producto no encontrado",
      });
    }
  });

module.exports = router;
