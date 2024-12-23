import { Request, Response } from 'express'; 
import * as RolService from '../services/rol.service';
import { Rol } from '../entities/rol';
import { BaseResponse } from '../shared/base-response';
import { Message } from '../enums/message';



export const insertarRol = async (req: Request, res: Response) => {
    try {
        console.log('insertarRol')
        const rol: Partial<Rol> = req.body;
        const newRol: Rol = await RolService.insertarRol(rol)
        res.json(BaseResponse.success(newRol,Message.INSERTADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }  
    
}

export const listarRol= async (req: Request, res: Response) => {
    try {
        console.log('listarRol');
        const roles: Rol[] = await RolService.listarRol();        
        res.json(BaseResponse.success(roles));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}

export const obtenerRol = async (req: Request, res: Response)=>{
    try {
        console.log('obtenerRol');
        const {idRol} = req.params;    
        const rol: Rol = await RolService.obtenerRol(Number(idRol));
        if(!rol){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        res.json(BaseResponse.success(rol));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}

export const actualizarRol = async (req: Request, res: Response)=>{
    try {
        const { idRol } = req.params;
        const rol: Partial<Rol> = req.body;
        if(!(await RolService.obtenerRol(Number(idRol)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        const updateEquipo: Rol = await RolService.actualizarRol(Number(idRol),rol)
        res.json(BaseResponse.success(updateEquipo,Message.ACTUALIZADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}

export const darBajaRol = async (req: Request, res: Response)=>{
    try {
        console.log('darBajaRol');
        const { idRol } = req.params;
        if(!(await RolService.obtenerRol(Number(idRol)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }        
        await RolService.darBajaRol(Number(idRol));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}