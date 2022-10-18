import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersMigration1666116923388 implements MigrationInterface {
  name = 'usersMigration1666116923388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" character varying NOT NULL, 
        "email" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "isAdm" boolean NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "isActive" boolean NOT NULL DEFAULT true, 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
