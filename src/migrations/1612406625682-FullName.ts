import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullName1612406625682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."FullName" (
            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
            "userId" uuid NOT NULL,
            "firstName" text NOT NULL,
            "lastName" text NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
        );
        
        ALTER TABLE ONLY public."FullName"
            ADD CONSTRAINT "FullName_id_pkey" PRIMARY KEY (id);
        ALTER TABLE ONLY public."FullName"
            ADD CONSTRAINT "FullName_userId_firstName_lastName_key" UNIQUE ("userId","firstName", "lastName");
        ALTER TABLE ONLY public."FullName"
            ADD CONSTRAINT "FullName_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('FullName');
  }
}
