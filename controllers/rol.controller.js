const db = require("../models");

exports.principal = (req, res) => {
  db.Rol.findAll({
    attributes: ["id", "nombre", "codigo"],
    where: { eliminado: false },
    order: [
      ["nombre", "DESC"],
      ["codigo", "ASC"],
    ],
  })
    .then((registros) => {
      res.status(200).send(registros);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error en accceso a la base de datos",
        error: err.errors[0].message,
      });
    });
};

exports.buscar = (req, res) => {

  const key = req.params.key;
  const value = req.params.value;   

  db.Rol.findAll({
    attributes: ["id", "nombre", "codigo"],
    where: { [key]: value, eliminado: false },
    order: [
      ["nombre", "DESC"],
      ["codigo", "ASC"],
    ],
  })
    .then((registros) => {
      res.status(200).send(registros);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error en accceso a la base de datos",
        error: err.errors[0].message,
      });
    });
};

exports.nuevo = (req, res) => {
  const nuevoRegistro = {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
  };

  db.Rol.create(nuevoRegistro)
    .then((reg) => {
      res.status(200).send({
        msg: "OK creado correctamente ",
        registro: reg,
      });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error en la carga ",
        error: err.errors[0].message,
      });
    });
};

const procesarEdicion = (req, res) => {
 
    let registroActualizar = {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
  };

  // Verificar si es eliminacion
  if (req.body.eliminado) {
    registroActualizar = {
      eliminado: true,
    };
  }

  const id = req.body.id;

  db.Rol.update(registroActualizar, {
    where: { id: id },
  })
    .then((cant) => {
      if (cant == 1) {
        res.status(200).send({
          msg: "OK actualizado correctamente ",
          registro: registroActualizar,
        });
      } else {
        res.status(500).send({
          msg: "ERROR EN ACTUALIZACIÓN ",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error en la carga ",
        error: err.errors[0].message,
      });
    });
};

exports.editar = (req, res) => {

  procesarEdicion(req, res);

};

exports.eliminar = (req, res) => {
 
  req.body.eliminado = true;

  procesarEdicion(req, res);
 
};
