import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';
import { UserEntity } from './user.entity';

@Entity('PhoneNumber')
@Unique('PhoneNumber_userId_value_key', ['user', 'value'])
export class PhoneNumberEntity extends BaseDBEntity {
  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'text', nullable: false })
  value: string;
}
