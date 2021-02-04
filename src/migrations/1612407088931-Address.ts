import { MigrationInterface, QueryRunner } from 'typeorm';

export class Address1612407088931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."Address" (
            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
            "userId" uuid NOT NULL,
            street text NOT NULL,
            "number" text NOT NULL,
            complement text,
            city text NOT NULL,
            "state" text NOT NULL,
            cep text NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
        );
        
        ALTER TABLE ONLY public."Address"
            ADD CONSTRAINT "Address_id_pkey" PRIMARY KEY (id);
        ALTER TABLE ONLY public."Address"
            ADD CONSTRAINT "Address_userId_address_key" UNIQUE ("userId","street", "number", "complement", "city", "state", "cep");
        ALTER TABLE ONLY public."Address"
            ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Address');
  }
}
