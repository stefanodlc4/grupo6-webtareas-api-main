import { Request, Response } from 'express';
import * as asignacionService from '../services/asignacion.service';
import { Asignacion } from '../entities/asignacion';
import { BaseResponse } from '../shared/base-response';
import { Message } from '../enums/message';

export const insertarAsignacion = async (req: Request, res: Response) => {
    try {
      console.log('insertarAsignacion');
      const asignacion: Partial<Asignacion> = req.body;
      const newAsignacion: Asignacion = await asignacionService.insertarAsignacion(asignacion);
      res.json(BaseResponse.success(newAsignacion, Message.INSERTADO_OK));
   } catch(error) { 
      console.error(error);
      res.status(500).json(BaseResponse.error(error.message));
   }

}

export const listarAsignacion = async (req: Request, res: Response) => {
  try {
    console.log('listarAsignacion');
    const asignaciones: Asignacion[] = await asignacionService.listarAsignacion();
    res.json(BaseResponse.success(asignaciones));
  } catch (error) {
    console.error(error);
    res.status(500).json(BaseResponse.error(error.message));
  }

}

export const obtenerAsignacion = async (req: Request, res: Response) => {
    try {
        const {idAsignacion} = req.params;
        const asignacion: Asignacion = await asignacionService.obtenerAsignacion(Number(idAsignacion));
        if(!asignacion){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        } 
        res.json(BaseResponse.success(asignacion)); 
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarAsignacion = async (req: Request, res: Response) => {
    try {
        const {idAsignacion} = req.params;
        const asignacion: Partial<Asignacion> = req.body;
        if((await asignacionService.obtenerAsignacion(Number(idAsignacion)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        const updateAsignacion: Asignacion = await asignacionService.actualizarAsignacion(Number(idAsignacion), asignacion);
        res.json(BaseResponse.success(updateAsignacion, Message.ACTUALIZADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}


export const darBajaAsignacion = async (req: Request, res: Response) => {
    try {
        const {idAsignacion} = req.params;
        if((await asignacionService.obtenerAsignacion(Number(idAsignacion)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        await asignacionService.darBajaAsignacion(Number(idAsignacion));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
   
}

}
