import { Router } from "express";
import * as ctr from "../controllers/usuarios.js";
const router = Router();


router.get('/', ctr.usuariosGet);

router.put('/:id', ctr.usuariosPut);

router.post('/', ctr.usuariosPost);

router.patch('/', ctr.usuariosPatch);

router.delete('/', ctr.usuariosDelete);

export {
    router
}