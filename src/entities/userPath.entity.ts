import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';
import { UserEntity } from './user.entity';

@Entity('UserPath')
@Unique('UserPath_userId_path_key', ['user', 'path'])
export class UserPathEntity extends BaseDBEntity {
  @ManyToOne(() => UserEntity, (user) => user, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'text', nullable: false })
  path: string;

  @Column({ type: 'text', nullable: false })
  nextPath: string;
}
