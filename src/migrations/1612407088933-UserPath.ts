import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPath1612407088933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."UserPath" (
            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
            "userId" uuid NOT NULL,
            "path" text NOT NULL,
            "nextPath" text NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
        );
        
        ALTER TABLE ONLY public."UserPath"
            ADD CONSTRAINT "UserPath_id_pkey" PRIMARY KEY (id);
        ALTER TABLE ONLY public."UserPath"
            ADD CONSTRAINT "UserPath_userId_path_key" UNIQUE ("userId","path");
        ALTER TABLE ONLY public."UserPath"
            ADD CONSTRAINT "UserPath_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('UserPath');
  }
}
