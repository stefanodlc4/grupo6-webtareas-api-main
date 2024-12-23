import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol";

@Entity('usuarios')
export class Usuario{
    @PrimaryGeneratedColumn({name:'id_usuario'})
    idUsuario: number;
    
    @Column({name:'nombre'})
    nombre: string;

    @Column({name:'apellido_paterno'})
    ApellidoPaterno: string;

    @Column({name:'apellido_materno'})
    ApellidoMaterno: string;

    @Column({name:'correo'})
    correo: string;

    @Column({name:'clave'})
    clave: string;

    @ManyToOne(()=>Rol,(rol)=>rol.usuarios)
    @JoinColumn({name: 'id_rol'})
    rol: Rol;

    @Column({name: 'estado_auditoria'})
    estadoAuditoria: string;
    
    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;

}