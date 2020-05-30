const { Router } = require('express');

const {verificarToken, verificarAdmin}= require('../middlewares/validarUsuario');

const router = Router();

const {
    agregarPedido,
    agregarProductosPedido,
    obtenerPedidos,
    obtenerPedidoId,
    actualizarEstadoPedido,
  } = require("../models/models.pedido");

  router
  .route("/")
  .post(verificarToken,async (req, res) => {
    const { idUsuario, idFormaPago, fecha, descripcionProductos, precioTotal, productos } = req.body;
    const pedido = await agregarPedido (idUsuario, idFormaPago, fecha, descripcionProductos, precioTotal);
    const idPedido = pedido[0];

    productos.forEach(element => {
        const idProduct = element.idProducto;
        const nProductos = element.cantidad;
        agregarProductosPedido (idPedido, idProduct, nProductos);
        
    });
    
    res.json({
      sucess: "true",
      message: "El pedido ha sido añadido EXITOSAMENTE!",
    });
  })
  .get(async (req, res) => {
    res.json(await obtenerPedidos());
  })

  router
  .route("/:id")
  .put(verificarAdmin, async (req, res) => {
    const { idEstado } = req.body;  

    try {
        await actualizarEstadoPedido(req, idEstado);
         res.json({
        sucess: "true",
           message: "El estado del pedido ha sido actualizado exitosamente",
         });
    } catch (error) {
        res.status(400).json({
            sucess: "false",
            message: "El id del pedido es incorrecto",
        });
    }

    })
    .get(verificarToken,async (req, res) => {
        res.json(await obtenerPedidoId(req));
     })

    
module.exports = router;  