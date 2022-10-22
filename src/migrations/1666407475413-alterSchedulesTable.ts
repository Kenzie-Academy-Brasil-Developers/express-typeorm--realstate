import { MigrationInterface, QueryRunner } from "typeorm";

export class alterSchedulesTable1666407475413 implements MigrationInterface {
    name = 'alterSchedulesTable1666407475413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "time" TO "hour"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "hour" TO "time"`);
    }

}
