const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');

const secret_jwt = require('../config/env').SECRET_JWT;

exports.principal = (req, res) => {

    db.Usuario.findAll({
        attributes: ["id", "email" ],
        include: [{ model: db.Rol, attributes: ["id","nombre", "codigo" ] } ]
    }).then(registros => {

    res.status(200).send(registros);

    }).catch((err) => {

        res.status(500).send({ 
            msg: 'Error al recuperar registros ******* ',
            err
             
        });
    })
}

exports.buscar = (req, res) => {
    res.status(200).send({ msg: 'OK desde BUSCAR ******* ' });
}

exports.registro = async (req, res) => {

    const passEncriptada = await bcrypt.hash(req.body.password, 12);

    const rolBase =  await db.Rol.findOne({
        where : { codigo : 'ADMIN' }
    });

    const nuevoUsuario = {
        email: req.body.email,
        password: passEncriptada,
        RolId: rolBase.id
    }

    console.log("Antes de guardar -> DATOS REC: ",nuevoUsuario);

    db.Usuario.create(nuevoUsuario).then((registro) =>{

        res.status(200).send({ 
            msg: 'Creado correctamente ******* ',
            registro    
        });

    }).catch((err) =>{

        res.status(500).send({ 
            msg: 'Error al crear ******* ',
            err
             
        });

    });  
}

exports.login = async (req, res) => {

    const usuario = await db.Usuario.findOne({
        where : { email : req.body.email }
    });

    if(usuario)
    {
        if(bcrypt.compareSync(req.body.password, usuario.password ))
        {
            // Login correcto
            const token = jwt.sign({
                id: usuario.id,
                email: req.body.email,
                rolId: usuario.RolId
            },
            secret_jwt,
            {
                expiresIn: '15m'
            });

            const data = {
                token: token,
                id: usuario.id,
                email: req.body.email,
                rolId: usuario.RolId
            }

            res.status(200).send({ data });

        }else
        {
            // La contraseña no es correcta
            res.status(500).send({ 
                msg: 'Error en login COD: 002 '                           
            });
        }
    }else{
        // No exite email en la base de datos
        res.status(500).send({ 
            msg: 'Error en login COD: 001 '                           
        });
    }

}

