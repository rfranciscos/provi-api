import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseDBEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn() createdAt?: Date;

  @UpdateDateColumn() updatedAt?: Date;
}
