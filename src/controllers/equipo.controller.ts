import { Request, Response } from 'express'; 
import * as EquipoService from '../services/equipo.service';
import { Equipo } from '../entities/equipo';
import { BaseResponse } from '../shared/base-response';
import { Message } from '../enums/message';



export const insertarEquipo = async (req: Request, res: Response) => {
    try {
        console.log('insertarEquipo')
        const equipo: Partial<Equipo> = req.body;
        const newEquipo: Equipo = await EquipoService.insertarEquipo(equipo)
        res.json(BaseResponse.success(newEquipo,Message.INSERTADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }  
    
}

export const listarEquipo = async (req: Request, res: Response) => {
    try {
        console.log('listarEquipo');
        const equipos: Equipo[] = await EquipoService.listarEquipo();        
        res.json(BaseResponse.success(equipos));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}

export const obtenerEquipo = async (req: Request, res: Response)=>{
    try {
        console.log('obtenerEquipo');
        const {idEquipo} = req.params;    
        const equipo: Equipo = await EquipoService.obtenerEquipo(Number(idEquipo));
        if(!equipo){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        res.json(BaseResponse.success(equipo));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}

export const actualizarEquipo = async (req: Request, res: Response)=>{
    try {
        const { idEquipo } = req.params;
        const equipo: Partial<Equipo> = req.body;
        if(!(await EquipoService.obtenerEquipo(Number(idEquipo)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        const updateEquipo: Equipo = await EquipoService.actualizarEquipo(Number(idEquipo),equipo)
        res.json(BaseResponse.success(updateEquipo,Message.ACTUALIZADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}

export const darBajaEquipo = async (req: Request, res: Response)=>{
    try {
        console.log('darBajaEquipo');
        const { idEquipo } = req.params;
        if(!(await EquipoService.obtenerEquipo(Number(idEquipo)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }        
        await EquipoService.darBajaEquipo(Number(idEquipo));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
    
}