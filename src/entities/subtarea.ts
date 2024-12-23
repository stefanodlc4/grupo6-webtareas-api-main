import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('subtareas') 
export class Subtarea {
    @PrimaryGeneratedColumn()
    id_subtarea: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    descripcion: string;

    @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
    fecha_creacion: Date;

    @Column({ type: 'timestamp', name: 'fecha_limite', nullable: false })
    fecha_limite: Date;

    @Column({ type: 'timestamp', name: 'fecha_terminacion', nullable: true })
    fecha_terminacion: Date;

    @Column({ type: 'varchar', length: 50, nullable: false })
    estado: string;

    @Column({ type: 'int', name: 'id_tarea', nullable: true })
    id_tarea: number;

    @Column({ type: 'int', name: 'id_usuario_asignado', nullable: true })
    id_usuario_asignado: number;

    @Column({ type: 'char', length: 1, name: 'estado_auditoria', nullable: false, default: 'A' })
    estado_auditoria: string;

    @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion_auditoria' })
    fecha_creacion_auditoria: Date;
}
