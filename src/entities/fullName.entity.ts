import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';
import { UserEntity } from './user.entity';

@Entity('FullName')
@Unique('FullName_userId_fisrtName_lastName_key', [
  'user',
  'firstName',
  'lastName',
])
export class FullNameEntity extends BaseDBEntity {
  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'text', nullable: false })
  firstName!: string;

  @Column({ type: 'text', nullable: false })
  lastName!: string;
}
