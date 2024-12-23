import { Router } from 'express';
import {
    insertarSubtarea,
    listarSubtareas,
    obtenerSubtarea,
    actualizarSubtarea,
    darBajaSubtarea
} from '../controllers/subtarea.controller';

const router: Router = Router();

router.post('/', insertarSubtarea); // Ruta para insertar una nueva subtarea
router.get('/', listarSubtareas); // Ruta para listar todas las subtareas activas
router.get('/:idSubtarea', obtenerSubtarea); // Ruta para obtener una subtarea por su ID
router.put('/:idSubtarea', actualizarSubtarea); // Ruta para actualizar una subtarea por su ID
router.delete('/:idSubtarea', darBajaSubtarea); // Ruta para dar de baja (eliminar lógicamente) una subtarea por su ID

export default router;
