import { AppDataSource } from "../config/db.config";
import { Equipo } from "../entities/equipo";
import { EstadoAuditoria } from "../enums/estado-auditoria";

const repository = AppDataSource.getRepository(Equipo);

export const insertarEquipo= async (data: Partial<Equipo>): Promise<Equipo>  => {
    const newEquipo: Equipo = await repository.save(data);
    return await repository.findOne({where: {idEquipo: newEquipo.idEquipo}});    
}

export const listarEquipo = async (): Promise<Equipo[]> =>{
    return await repository.find({where: {estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const obtenerEquipo = async (idEquipo: number ) : Promise<Equipo> => {
    return await repository.findOne({ where: { idEquipo , estadoAuditoria: EstadoAuditoria.ACTIVO } });  
}

export const actualizarEquipo = async (idEquipo: number, data: Partial<Equipo>) => {
    await repository.update(idEquipo,data);
    return obtenerEquipo(idEquipo);
}

export const darBajaEquipo = async (idEquipo: number): Promise<void> => {
    await repository.update(idEquipo, { estadoAuditoria: EstadoAuditoria.INACTIVO });
    
}