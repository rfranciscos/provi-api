import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';
import { UserEntity } from './user.entity';

@Entity('CPF')
export class CPFEntity extends BaseDBEntity {
  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'text', nullable: false, unique: true })
  value: string;
}
