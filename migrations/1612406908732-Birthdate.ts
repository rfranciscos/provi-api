import { MigrationInterface, QueryRunner } from 'typeorm';

export class Birthdate1612406908732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."Birthdate" (
            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
            "userId" uuid NOT NULL,
            "value" date NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
        );
        
        ALTER TABLE ONLY public."Birthdate"
            ADD CONSTRAINT "Birthdate_id_pkey" PRIMARY KEY (id);
        ALTER TABLE ONLY public."Birthdate"
            ADD CONSTRAINT "Birthdate_userId_value_key" UNIQUE ("userId","value");
        ALTER TABLE ONLY public."Birthdate"
            ADD CONSTRAINT "Birthdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Birthdate');
  }
}
