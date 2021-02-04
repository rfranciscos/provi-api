import { Column, Entity, Unique } from 'typeorm';
import { BaseDBEntity } from './baseDBEntity';

@Entity('Address')
@Unique('Address_userId_address_key', [
  'userId',
  'street',
  'number',
  'complement',
  'city',
  'state',
  'cep',
])
export class AddressEntity extends BaseDBEntity {
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

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
