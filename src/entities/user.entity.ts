import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseDBEntity } from './baseDBEntity';
import { CPFEntity } from './cpf.entity';

@Entity('User')
export class UserEntity extends BaseDBEntity {
  @Column({ type: 'text', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @OneToMany(() => CPFEntity, (cpf) => cpf.user)
  cpfs: CPFEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
