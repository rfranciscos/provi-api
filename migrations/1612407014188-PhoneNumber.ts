import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhoneNumber1612407014188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."PhoneNumber" (
            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
            "userId" uuid NOT NULL,
            "value" text NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
        );
        
        ALTER TABLE ONLY public."PhoneNumber"
            ADD CONSTRAINT "PhoneNumber_id_pkey" PRIMARY KEY (id);
        ALTER TABLE ONLY public."PhoneNumber"
            ADD CONSTRAINT "PhoneNumber_userId_value_key" UNIQUE ("userId","value");
        ALTER TABLE ONLY public."PhoneNumber"
            ADD CONSTRAINT "PhoneNumber_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PhoneNumber');
  }
}
