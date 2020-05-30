const pedido = {};

const sequelize= require('../config/config');

pedido.agregarPedido = async (
    idUsuario, idFormaPago, fecha, descripcionProductos, precioTotal
  ) => {
    const result = await sequelize.query(
      "INSERT INTO PEDIDOS (idusuario, idFormaPago, idEstado, fecha, descripcionProductos, precioTotal) VALUES (?,?,1,?,?,?)",
      {
        replacements: [idUsuario, idFormaPago, fecha, descripcionProductos, precioTotal],
      }
    );
    return result;
  };  


pedido.agregarProductosPedido = async (
    idPedido, idProduct, nProductos
  ) => {
        const result = await sequelize.query(
            "INSERT INTO PEDIDO_PRODUCTOS (idPedido, idProducto, cantidad) VALUES (?,?,?)",
            {
              replacements: [idPedido, idProduct, nProductos],
            }
          ); 
          return result;
  };    

pedido.obtenerPedidos = async () => {
    const result = await sequelize.query(
      "SELECT PEDIDOS.id, PEDIDOS.descripcionProductos, USUARIOS.usuario, USUARIOS.direccion, PEDIDOS.fecha, ESTADOS.estado, PAGO.formaPago, PEDIDOS.precioTotal FROM PEDIDOS JOIN USUARIOS ON USUARIOS.id= PEDIDOS.idUsuario JOIN PAGO ON PEDIDOS.idFormaPago= PAGO.id JOIN ESTADOS ON PEDIDOS.idEstado = ESTADOS.id ",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  };

pedido.obtenerPedidoId = async (req) => {
    const idPedido = req.params.id;
    const result = {}
    result.productos = await sequelize.query(
       
     "SELECT PEDIDO_PRODUCTOS.idPedido, PRODUCTOS.producto, PRODUCTOS.precio, PEDIDO_PRODUCTOS.cantidad FROM PEDIDO_PRODUCTOS JOIN PEDIDOS ON PEDIDOS.id = PEDIDO_PRODUCTOS.idPedido JOIN PRODUCTOS ON PEDIDO_PRODUCTOS.idProducto= PRODUCTOS.id WHERE idPedido=?",
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: [idPedido],
      } );

    result.datosPedido = await sequelize.query(   
      "SELECT USUARIOS.*, ESTADOS.estado, PAGO.formaPago, PEDIDOS.precioTotal FROM PEDIDOS JOIN USUARIOS ON PEDIDOS.idUsuario=USUARIOS.id JOIN PAGO ON PEDIDOS.idFormaPago= PAGO.id JOIN ESTADOS ON PEDIDOS.idEstado = ESTADOS.id WHERE PEDIDOS.id=?",
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: [idPedido],
      }
    );
    return result;
  };  


pedido.actualizarEstadoPedido = async (req,
    idEstado
  ) => {
    const idPedido = req.params.id;
    const result = await sequelize.query(
      "UPDATE PEDIDOS SET idEstado=? WHERE id=?",
      {
        replacements: [idEstado,idPedido],
      }
    );
    return result;
  };

  module.exports = pedido;