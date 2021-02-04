import { Column, Entity } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';

@Entity('CPF')
export class CPFEntity extends BaseDBEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'text', nullable: false, unique: true })
  value!: string;
}
