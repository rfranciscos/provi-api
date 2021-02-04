import { Column, Entity, Unique } from 'typeorm';

@Entity('PhoneNumber')
@Unique('PhoneNumber_userId_value_key', ['userId', 'value'])
export class PhoneNumberEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'text', nullable: false })
  value!: string;
}
