const jwt = require('jsonwebtoken');

const tokenManejador = {};

const jwtFirma = 'misupercontraseña';

tokenManejador.crearToken  = usuario => jwt.sign(usuario, jwtFirma);
tokenManejador.validarToken = token =>  jwt.verify(token, jwtFirma);
module.exports = tokenManejador;
 