import { AppDataSource } from "../config/db.config";
import { Rol } from "../entities/rol";
import { EstadoAuditoria } from "../enums/estado-auditoria";

const repository = AppDataSource.getRepository(Rol);

export const insertarRol= async (data: Partial<Rol>): Promise<Rol>  => {
    const newRol: Rol = await repository.save(data);
    return await repository.findOne({where: {idRol: newRol.idRol}});    
}

export const listarRol = async (): Promise<Rol[]> =>{
    return await repository.find({where: {estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const obtenerRol = async (idRol: number ) : Promise<Rol> => {
    return await repository.findOne({ where: { idRol , estadoAuditoria: EstadoAuditoria.ACTIVO } });  
}

export const actualizarRol = async (idRol: number, data: Partial<Rol>) => {
    await repository.update(idRol,data);
    return obtenerRol(idRol);
}

export const darBajaRol = async (idRol: number): Promise<void> => {
    await repository.update(idRol, { estadoAuditoria: EstadoAuditoria.INACTIVO });
    
}