import { Request, Response } from 'express'; 
import * as UsuarioService from '../services/usuario.service';
import { Usuario } from '../entities/usuario';
import { BaseResponse } from '../shared/base-response';
import { Message } from '../enums/message';

export const insertarUsuario = async (req: Request, res: Response) => {
    try {
        console.log('insertarUsuario')
        const usuario: Partial<Usuario> = req.body;
        const newUsuario: Usuario = await UsuarioService.insertarUsuario(usuario)
        res.json(BaseResponse.success(newUsuario,Message.INSERTADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }   
}

export const listarUsuario = async (req: Request, res: Response) => {
    try {
        console.log('listarUsuario');
        const usuarios: Usuario[] = await UsuarioService.listarUsuario();        
        res.json(BaseResponse.success(usuarios));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }   
}

export const obtenerUsuario = async (req: Request, res: Response)=>{
    try {
        console.log('obtenerUsuario');
        const {idUsuario} = req.params;    
        const usuario: Usuario = await UsuarioService.obtenerUsuario(Number(idUsuario));
        if(!usuario){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        res.json(BaseResponse.success(usuario));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }    
}

export const actualizarUsuario = async (req: Request, res: Response)=>{
    try {
        const { idUsuario } = req.params;
        const usuario: Partial<Usuario> = req.body;
        if(!(await UsuarioService.obtenerUsuario(Number(idUsuario)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }
        const updateUsuario: Usuario = await UsuarioService.actualizarUsuario(Number(idUsuario),usuario)
        res.json(BaseResponse.success(updateUsuario,Message.ACTUALIZADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }    
}

export const darBajaUsuario = async (req: Request, res: Response)=>{
    try {
        console.log('darBajaUsuario');
        const { idUsuario } = req.params;
        if(!(await UsuarioService.obtenerUsuario(Number(idUsuario)))){
            res.status(404).json(BaseResponse.error(Message.NOT_FOUND,404));
            return;
        }        
        await UsuarioService.darBajaUsuario(Number(idUsuario));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }    
}