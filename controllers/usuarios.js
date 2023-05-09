import { response, request } from 'express';
import bscryptjs from 'bcryptjs';
import Usuario from '../models/usuario.js';


const usuariosGet = async (req = request, res = response) => {

    const { desde = 0, limite = 5 } = req.query;
    const criterio = { estado: true };
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(criterio),
        Usuario.find(criterio)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bscryptjs.genSaltSync();
        resto.password = bscryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json(
        usuario
    );
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar la contraseña
    const salt = bscryptjs.genSaltSync();
    usuario.password = bscryptjs.hashSync(password, salt);

    //guardar en DB
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosPatch = (req = request, res = response) => {
    res.status(201).json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async (req = request, res = response) => {
    const {id} = req.params;

    //borrado fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //baja logica
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});    

    res.status(200).json({       
        usuario: usuario
    });
}

export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}