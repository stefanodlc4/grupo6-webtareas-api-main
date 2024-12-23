import { AppDataSource } from "../config/db.config";
import { Asignacion } from "../entities/asignacion";
import { EstadoAuditoria } from "../enums/estado-auditoria";

const repository = AppDataSource.getRepository(Asignacion);

export const insertarAsignacion = async (data: Partial<Asignacion>) : Promise<Asignacion> => {
    const newAsignacion: Asignacion = await repository.save(data);
    return await repository.findOne({where: {idAsignacion: newAsignacion.idAsignacion}});
}

export const listarAsignacion = async (): Promise<Asignacion[]> => {
    return await repository.find({where:{estadoAuditoria: EstadoAuditoria.ACTIVO}});
    
}

export const obtenerAsignacion = async (idAsignacion: number): Promise<Asignacion> => {
    return await repository.findOne({where: {idAsignacion, estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const actualizarAsignacion = async (idAsignacion: number, data: Partial<Asignacion>): Promise<Asignacion> => {
    await repository.update(idAsignacion, data);
    return obtenerAsignacion(idAsignacion);
}

export const darBajaAsignacion = async (idAsignacion: number): Promise<void> => {
    await repository.update(idAsignacion, {estadoAuditoria: EstadoAuditoria.INACTIVO});
}