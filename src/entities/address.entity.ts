import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';
import { UserEntity } from './user.entity';

@Entity('Address')
@Unique('Address_userId_address_key', [
  'user',
  'street',
  'number',
  'complement',
  'city',
  'state',
  'cep',
])
export class AddressEntity extends BaseDBEntity {
  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'text', nullable: false })
  street!: string;

  @Column({ type: 'text', nullable: false })
  number!: string;

  @Column({ type: 'text', nullable: true })
  complement?: string;

  @Column({ type: 'text', nullable: false })
  city!: string;

  @Column({ type: 'text', nullable: false })
  state!: string;

  @Column({ type: 'text', nullable: false })
  cep!: string;
}
