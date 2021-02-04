import { Column, Entity, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';

@Entity('PhoneNumber')
@Unique('PhoneNumber_userId_value_key', ['userId', 'value'])
export class PhoneNumberEntity extends BaseDBEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'text', nullable: false })
  value!: string;
}
