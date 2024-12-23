import { AppDataSource } from "../config/db.config";
import { Subtarea } from "../entities/subtarea";
import { EstadoAuditoria } from "../enums/estado-auditoria";

const repository = AppDataSource.getRepository(Subtarea);

export const insertarSubtarea = async (data: Partial<Subtarea>): Promise<Subtarea> => {
    const newSubtarea: Subtarea = await repository.save(data);
    return await repository.findOne({ where: { id_subtarea: newSubtarea.id_subtarea } });
};

export const listarSubtareas = async (): Promise<Subtarea[]> => {
    return await repository.find({ where: { estado_auditoria: EstadoAuditoria.ACTIVO } });
};

export const obtenerSubtarea = async (idSubtarea: number): Promise<Subtarea> => {
    return await repository.findOne({
        where: { id_subtarea: idSubtarea, estado_auditoria: EstadoAuditoria.ACTIVO },
    });
};

export const actualizarSubtarea = async (idSubtarea: number, data: Partial<Subtarea>): Promise<Subtarea> => {
    await repository.update(idSubtarea, data);
    return obtenerSubtarea(idSubtarea);
};

export const darBajaSubtarea = async (idSubtarea: number): Promise<void> => {
    await repository.update(idSubtarea, { estado_auditoria: EstadoAuditoria.INACTIVO });
};
