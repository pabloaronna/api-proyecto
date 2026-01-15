const express = require('express');
const RolRoutes = express.Router();

const RolController = require('../controllers/rol.controller');

RolRoutes.get('/', RolController.principal );
RolRoutes.get('/buscar/:key/:value', RolController.buscar );
RolRoutes.post('/nuevo',  RolController.nuevo );
RolRoutes.put('/editar',  RolController.editar );

// No se elimina el registro, se pasa a TRUE el campo ELIMINADO
RolRoutes.delete('/eliminar',  RolController.eliminar );

module.exports = RolRoutes;
