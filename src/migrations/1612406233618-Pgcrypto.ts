import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pgcrypto1612406233618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION pgcrypto;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP EXTENSION pgcrypto;
    `);
  }
}
