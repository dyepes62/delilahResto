const productos = {};

const sequelize = require("../config/config");

productos.agregarProducto = async (
  producto,
  precio,
  urlImagen,
  descripcion
) => {
  const result = await sequelize.query(
    "INSERT INTO PRODUCTOS (producto, precio, urlImagen, descripcion) VALUES (?,?,?,?)",
    {
      replacements: [producto, precio, urlImagen, descripcion],
    }
  );
  return result;
};

productos.obtenerProductos = async () => {
  const result = await sequelize.query(
    "SELECT producto, precio, urlImagen, descripcion FROM PRODUCTOS",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return result;
};

productos.actualizarProducto = async (
  producto,
  precio,
  urlImagen,
  descripcion,
  nombreProducto
) => {
  const result = await sequelize.query(
    "UPDATE PRODUCTOS SET producto=?, precio=?, urlImagen=?, descripcion=?  WHERE producto=?",
    {
      replacements: [producto, precio, urlImagen, descripcion, nombreProducto],
    }
  );
  return result;
};

productos.borrarProducto = async (nombreProducto) => {
  const result = await sequelize.query(
    "DELETE FROM PRODUCTOS WHERE producto=?",
    {
      replacements: [nombreProducto],
    }
  );
  return result;
};

module.exports = productos;
