import { Request, Response } from 'express';
import * as SubtareaService from '../services/subtarea.service';
import { Subtarea } from '../entities/subtarea';
import { BaseResponse } from '../shared/base-response';
import { Message } from '../enums/message';

export const insertarSubtarea = async (req: Request, res: Response) => {
    try {
        console.log('insertarSubtarea');
        const subtarea: Partial<Subtarea> = req.body;
        const newSubtarea: Subtarea = await SubtareaService.insertarSubtarea(subtarea);
        res.json(BaseResponse.success(newSubtarea, Message.INSERTADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const listarSubtareas = async (req: Request, res: Response) => {
    try {
        console.log('listarSubtareas');
        const subtareas: Subtarea[] = await SubtareaService.listarSubtareas();
        res.json(BaseResponse.success(subtareas));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const obtenerSubtarea = async (req: Request, res: Response) => {
    try {
        console.log('obtenerSubtarea');
        const { idSubtarea } = req.params;
        const subtarea: Subtarea = await SubtareaService.obtenerSubtarea(Number(idSubtarea));
        if (!subtarea) {
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND, 404));
            return;
        }
        res.json(BaseResponse.success(subtarea));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const actualizarSubtarea = async (req: Request, res: Response) => {
    try {
        const { idSubtarea } = req.params;
        const subtarea: Partial<Subtarea> = req.body;
        if (!(await SubtareaService.obtenerSubtarea(Number(idSubtarea)))) {
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND, 404));
            return;
        }
        const updatedSubtarea: Subtarea = await SubtareaService.actualizarSubtarea(Number(idSubtarea), subtarea);
        res.json(BaseResponse.success(updatedSubtarea, Message.ACTUALIZADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const darBajaSubtarea = async (req: Request, res: Response) => {
    try {
        console.log('darBajaSubtarea');
        const { idSubtarea } = req.params;
        if (!(await SubtareaService.obtenerSubtarea(Number(idSubtarea)))) {
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND, 404));
            return;
        }
        await SubtareaService.darBajaSubtarea(Number(idSubtarea));
        res.json(BaseResponse.success(null, Message.ELIMINADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};
