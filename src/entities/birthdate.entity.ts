import { Column, Entity, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';

@Entity('Birthdate')
@Unique('Birthdate_userId_value_key', ['userId', 'value'])
export class BirthdateEntity extends BaseDBEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'date', nullable: false })
  value!: Date;
}
