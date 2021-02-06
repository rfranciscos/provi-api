import { MigrationInterface, QueryRunner } from 'typeorm';

export class AmountRequested1612407088932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."AmountRequested" (
            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
            "userId" uuid NOT NULL,
            "value" numeric NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
        );
        
        ALTER TABLE ONLY public."AmountRequested"
            ADD CONSTRAINT "AmountRequested_id_pkey" PRIMARY KEY (id);
        ALTER TABLE ONLY public."AmountRequested"
            ADD CONSTRAINT "AmountRequested_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('AmountRequested');
  }
}
