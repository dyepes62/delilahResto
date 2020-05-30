const sequelize = require("../config/config");

const usuarioLista = {};

usuarioLista.agregar = async (
  usuario,
  nombreApellido,
  email,
  telefono,
  direccion,
  contrasena
) => {
  const result = await sequelize.query(
    "INSERT INTO USUARIOS (usuario, nombreApellido, email, telefono, direccion, contrasena, esAdmin) VALUES (?,?,?,?,?,?,FALSE)",
    {
      replacements: [
        usuario,
        nombreApellido,
        email,
        telefono,
        direccion,
        contrasena,
      ],
    }
  );
  return result;
};

usuarioLista.login = async (usuario, contrasena) => {
  const result = await sequelize.query(
    "SELECT usuario, nombreApellido, email, telefono, direccion, esAdmin FROM USUARIOS WHERE usuario=? AND contrasena=?",
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: [usuario, contrasena],
    }
  );

  return result;
};

usuarioLista.obtener = async () => {
  const result = await sequelize.query(
    "SELECT usuario, nombreApellido, email, telefono, direccion FROM USUARIOS",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return result;
};

usuarioLista.obtenerId = async (req) => {
  const numeroId = req.params.id;
  const result = await sequelize.query(
    "SELECT usuario, nombreApellido, email, telefono, direccion FROM USUARIOS WHERE id=?",
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: [numeroId],
    }
  );
  return result;
};

module.exports = usuarioLista;
