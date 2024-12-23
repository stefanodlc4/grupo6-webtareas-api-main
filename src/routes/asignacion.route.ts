import { Router } from "express";
import { actualizarAsignacion, insertarAsignacion, listarAsignacion, darBajaAsignacion, obtenerAsignacion } from "../controllers/asignacion.controller";

const router: Router = Router();

router.post('/',insertarAsignacion);
router.get('/',listarAsignacion);
router.get('/:idAsignacion',obtenerAsignacion);
router.put('/:idAsignacion',actualizarAsignacion);
router.delete('/:idAsignacion',darBajaAsignacion);

export default router;