const { Router } = require("express");

const tokenManejador = require("../middlewares/tokenManejador");

const {
  verificarDatos,
  verificarAdmin,
} = require("../middlewares/validarUsuario");

const router = Router();
const {
  agregar,
  login,
  obtener,
  obtenerId,
} = require("../models/models.usuario.js");
// const { verificarUsuario } = require('../middlewares/middlewares');

router
  .route("/")
  .post(verificarDatos, async (req, res) => {
    const {
      usuario,
      nombreApellido,
      email,
      telefono,
      direccion,
      contrasena,
    } = req.body;
    const datos = { usuario, nombreApellido, email, telefono, direccion };
    await agregar(
      usuario,
      nombreApellido,
      email,
      telefono,
      direccion,
      contrasena
    );
    const token = tokenManejador.crearToken(datos);
    res.json({
      sucess: "true",
      token,
      message: "El Usuario ha sido creado EXITOSAMENTE!",
    });
  })
  .get(verificarAdmin, async (req, res) => {
    res.json(await obtener());
  });

router.route("/login").post(async (req, res) => {
  const { usuario, contrasena } = req.body;
  const validaUser = await login(usuario, contrasena);
  if (validaUser.length > 0) {
    const token = tokenManejador.crearToken(validaUser[0]);
    res.status(201).json({
      token,
      mensaje: "Usuario Valido",
    });
  } else {
    res.status(404).json("Usuario y/o contrasena invalidos");
  }
});

router.route("/:id").get(verificarAdmin, async (req, res) => {
  res.json(await obtenerId(req));
});

module.exports = router;
