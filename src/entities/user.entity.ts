import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseDBEntity } from './baseDBEntity';
import { CPFEntity } from './cpf.entity';
import { PhoneNumberEntity } from './phoneNumber.entity';
import { FullNameEntity } from './fullName.entity';
import { BirthdateEntity } from './birthdate.entity';

@Entity('User')
export class UserEntity extends BaseDBEntity {
  @Column({ type: 'text', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @OneToMany(() => CPFEntity, (cpf) => cpf.user)
  cpfs: CPFEntity[];

  @OneToMany(() => PhoneNumberEntity, (phoneNumber) => phoneNumber.user)
  phoneNumbers: PhoneNumberEntity[];

  @OneToMany(() => FullNameEntity, (fullName) => fullName.user)
  fullNames: FullNameEntity[];

  @OneToMany(() => BirthdateEntity, (birthdate) => birthdate.user)
  birthdates: BirthdateEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
