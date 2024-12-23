import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario";

@Entity('roles')
export class Rol{
    @PrimaryGeneratedColumn({name: 'id_rol'})
    idRol: Number;

    @Column({name: 'nombre'})
    nombre: string;
    
    @Column({name: 'estado_auditoria'})
    estadoAuditoria: string;

    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;


    @OneToMany(()=>Usuario,(usuario)=>usuario.rol)
    usuarios: Usuario[];

}