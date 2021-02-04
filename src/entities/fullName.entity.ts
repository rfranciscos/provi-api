import { Column, Entity, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';

@Entity('FullName')
@Unique('FullName_userId_fisrtName_lastName_key', [
  'userId',
  'firstName',
  'lastName',
])
export class FullNameEntity extends BaseDBEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'text', nullable: false })
  firstName!: string;

  @Column({ type: 'text', nullable: false })
  lastName!: string;
}
