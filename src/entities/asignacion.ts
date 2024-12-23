import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('asignaciones')
export class Asignacion {
    @PrimaryGeneratedColumn({name: 'id_asignacion'})
    idAsignacion: number;

    @Column({name: 'id_tarea'})
    idTarea: number;

    @Column({name: 'id_usuario'})
    idUsuario: number;
    
    @Column({name: 'estado_auditoria'})
    estadoAuditoria: string;

    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;
}