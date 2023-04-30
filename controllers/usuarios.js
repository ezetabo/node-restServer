import { response, request } from 'express';


const usuariosGet = (req = request, res = response) => {
    res.status(200).json({
        msg: 'get API - controlador'
    });
}

const usuariosPut = (req = request, res = response) => {
    const {id} = req.params;
    res.status(200).json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosPost = (req = request, res = response) => {
    const {nombre,edad} = req.body;
    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPatch = (req = request, res = response) => {
    res.status(201).json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.status(200).json({
        msg: 'delete API - controlador'
    });
}

export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}