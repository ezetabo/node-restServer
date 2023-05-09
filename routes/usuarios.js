import { Router } from "express";
import { check } from "express-validator";
import * as mdw from "../middlewares/index.js";
import { esRolValido, existeID, existeMail } from "../helpers/db-validators.js";
import * as ctr from "../controllers/usuarios.js";


const router = Router();


router.get('/', ctr.usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeID),
    check('rol').custom(esRolValido),
    mdw.validarCampos
], ctr.usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeMail),
    check('rol').custom((rol) => esRolValido(rol)),
    mdw.validarCampos
], ctr.usuariosPost);

router.patch('/', ctr.usuariosPatch);

router.delete('/:id', [
    mdw.validarJWT,
    mdw.validarRoles.esAdmin,
    mdw.validarRoles.tieneRol('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeID),
    mdw.validarCampos
], ctr.usuariosDelete);


check('rol').custom(async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no es valido`);
    }
})

export {
    router
}