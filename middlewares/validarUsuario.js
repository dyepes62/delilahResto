const verificarUsuario = {};

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://master_daniela:Acamica123@automosaiko.tk:3306/master_daniela');

const tokenManejador = require('./tokenManejador');


verificarUsuario.verificarToken = (req, res, next) =>  {
    try {
        const usuario = tokenManejador.validarToken(req.headers.authorization);
        req.usuarioLogueado = usuario;
        
        next();
    } catch {
        res.status(404).json('jwt invalidos');
    }
}

verificarUsuario.verificarDatos = async (req, res, next) => {
  const { usuario, contrasena} = req.body;
   const result = await sequelize.query('SELECT usuario, nombreApellido, email, telefono, direccion FROM USUARIOS WHERE usuario=? AND contrasena=?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [usuario, contrasena]
    });
    if (result.length > 0) {
        res.status(400).json({
            sucess: 'false',
            message: 'El usuario ya existe, por favor usar otro',
        });
    } else {
        next();
        };
    }

verificarUsuario.verificarAdmin=  (req, res, next) =>  {
    try {
        const usuario = tokenManejador.validarToken(req.headers.authorization);
        req.usuarioLogueado = usuario;

        if ((usuario.usuario === "administrator")||(usuario.esAdmin)){
            next();
        } else {
            res.status(401).json('No autorizado');
        }
        
    } catch {
        res.status(401).json('No autoriza');
    }
}   

    module.exports = verificarUsuario;