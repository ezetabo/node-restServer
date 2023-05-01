import { Router } from "express";
import * as ctr from "../controllers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { esRolValido, existeID, existeMail } from "../helpers/db-validators.js";


const router = Router();


router.get('/', ctr.usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeID),
    check('rol').custom(esRolValido),
    validarCampos
], ctr.usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeMail),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos
], ctr.usuariosPost);

router.patch('/', ctr.usuariosPatch);

router.delete('/:id',[
    //644fdc30ea8d180267694de0
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos
], ctr.usuariosDelete);

export {
    router
}

check('rol').custom(async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no es valido`);
    }
})