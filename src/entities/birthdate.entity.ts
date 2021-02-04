import { Column, Entity, Unique } from 'typeorm';

@Entity('Birthdate')
@Unique('Birthdate_userId_value_key', ['userId', 'value'])
export class BirthdateEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'date', nullable: false })
  value!: Date;
}
