// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Migrations1740136464962 implements MigrationInterface {
//     name = 'Migrations1740136464962'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "createdAt"`);
//         await queryRunner.query(`ALTER TABLE "auth" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "updatedAt"`);
//         await queryRunner.query(`ALTER TABLE "auth" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
//         await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
//         await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
//         await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
//         await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "updatedAt"`);
//         await queryRunner.query(`ALTER TABLE "auth" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "createdAt"`);
//         await queryRunner.query(`ALTER TABLE "auth" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
//     }

// }
