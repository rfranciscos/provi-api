import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseDBEntity } from './baseDBEntity';

@Entity('User')
export class UserEntity extends BaseDBEntity {
  @Column({ type: 'text', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
