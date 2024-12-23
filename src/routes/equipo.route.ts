import { Router } from 'express';
import {insertarEquipo,listarEquipo,obtenerEquipo,actualizarEquipo,darBajaEquipo} from '../controllers/equipo.controller';

const router: Router = Router();

router.post('/',insertarEquipo);
router.get('/',listarEquipo);
router.get('/:idEquipo',obtenerEquipo);
router.put('/:idEquipo',actualizarEquipo);
router.delete('/:idEquipo',darBajaEquipo);

export default router;