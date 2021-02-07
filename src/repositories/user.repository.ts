import { UserEntity } from '@entities';
import { Repository } from 'typeorm';
import { UserPathRepository } from './userPath.repository';

export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly userPathRepository: UserPathRepository) {
    super();
  }

  async getPathByPath(path: string) {
    const pathh = await this.userPathRepository.findOneOrFail({ path });
    await this.userPathRepository.update(
      { id: pathh.id },
      { updatedAt: new Date() },
    );
  }
}
