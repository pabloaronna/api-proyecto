const express = require('express');
const auth = require('../middleware/auth');
const UsuarioRoutes = express.Router();

const UsuarioController = require('../controllers/usuario.controller');

// de acceso privado
UsuarioRoutes.get('/', auth, UsuarioController.principal );
UsuarioRoutes.get('/buscar', auth, UsuarioController.buscar );

// de acceso publico
UsuarioRoutes.post('/registro',  UsuarioController.registro );
UsuarioRoutes.post('/login',  UsuarioController.login );


module.exports = UsuarioRoutes;

