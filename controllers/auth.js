import { response } from "express";
import Usuario from '../models/usuario.js';
import bscryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generar-jwt.js";

const login = async(req,res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                smg:'Usuario no existe'
            });
        }

        if (!usuario.estado){
            return res.status(400).json({
                smg:'Usuario no se encuentra activo'
            });
        }

        const validPassword = bscryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                smg:'La contraseña no es correcta'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Pongase en contacto co el administrador'
        });
    }


};

export {
    login
}