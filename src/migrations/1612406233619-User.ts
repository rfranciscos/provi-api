import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1612406233619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."User" (
            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
            email text NOT null,
            "password" text NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
        );
    
        ALTER TABLE ONLY public."User"
            ADD CONSTRAINT "User_id_pkey" PRIMARY KEY (id);
        ALTER TABLE ONLY public."User"
            ADD CONSTRAINT "User_email_key" UNIQUE ("email");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User');
  }
}
