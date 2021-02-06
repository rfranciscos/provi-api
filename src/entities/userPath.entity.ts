import { Entity, Column, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';

@Entity('UserPath')
@Unique('UserPath_userId_path_key', ['userId', 'path'])
export class UserPathEntity extends BaseDBEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'text', nullable: false })
  path!: string;

  @Column({ type: 'text', nullable: false })
  nextPath!: string;
}
