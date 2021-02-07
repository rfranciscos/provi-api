import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';
import { UserEntity } from './user.entity';

@Entity('AmountRequested')
export class AmountRequestedEntity extends BaseDBEntity {
  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'numeric', nullable: false })
  value: number;
}
