import { Column, Entity } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';

@Entity('AmountRequested')
export class AmountRequestedEntity extends BaseDBEntity {
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'numeric', nullable: false })
  value: number;
}
