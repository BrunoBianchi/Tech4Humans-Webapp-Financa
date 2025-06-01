import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748800459588 implements MigrationInterface {
    name = 'Init1748800459588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."card_cardtype_enum" AS ENUM('debito', 'credito')`);
        await queryRunner.query(`CREATE TABLE "card" ("id" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "cardNumber" character varying NOT NULL, "limit" integer NOT NULL DEFAULT '10000', "cardType" "public"."card_cardtype_enum" NOT NULL, "accountId" character varying(30), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "userId" character varying(30) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('debito', 'credito')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "description" character varying, "type" "public"."transaction_type_enum" NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "sourceAccountId" character varying(30) NOT NULL, "destinationAccountId" character varying(30) NOT NULL, "categoryId" character varying(30), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "destinationAccountId" character varying NOT NULL, "accountId" character varying(30), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."investiment_investmenttype_enum" AS ENUM('TD', 'CDB', 'LCI', 'LCA', 'CRI', 'CRA', 'DEB', 'ACAO', 'FII', 'ETF', 'BDR', 'FMI', 'PVP', 'POU', 'CAM', 'CRY')`);
        await queryRunner.query(`CREATE TYPE "public"."investiment_approximatedmonthlygains_enum" AS ENUM('0.9', '1.0', '0.85', '0.85_LCA', '1.1', '1.1_CRA', '1.2', '1.5', '0.9_FII', '1.3', '1.4', '1.0_FMI', '0.8', '0.5', '0.0', '5.0')`);
        await queryRunner.query(`CREATE TABLE "investiment" ("id" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "investmentType" "public"."investiment_investmenttype_enum" NOT NULL, "approximatedMonthlyGains" "public"."investiment_approximatedmonthlygains_enum" NOT NULL, "amount" integer NOT NULL, "accountId" character varying(30), CONSTRAINT "PK_bcf5c72b00082e71748e9d9ed72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."account_type_enum" AS ENUM('poupanca', 'corrente')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "bank" character varying NOT NULL, "type" "public"."account_type_enum" NOT NULL, "balance" integer NOT NULL, "orcamento" integer, "userId" character varying(30), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_6929cab8da9e7669da4bec04905" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_c83ba3ecd15481a4bae9a09f76b" FOREIGN KEY ("sourceAccountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_6e328d7823e68db7cb5ac7abc67" FOREIGN KEY ("destinationAccountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_c41c33073aa7374623d9b20a6ba" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investiment" ADD CONSTRAINT "FK_3382d6b9de17cd702f3d4fbf608" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`);
        await queryRunner.query(`ALTER TABLE "investiment" DROP CONSTRAINT "FK_3382d6b9de17cd702f3d4fbf608"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_c41c33073aa7374623d9b20a6ba"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_6e328d7823e68db7cb5ac7abc67"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_c83ba3ecd15481a4bae9a09f76b"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_6929cab8da9e7669da4bec04905"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_type_enum"`);
        await queryRunner.query(`DROP TABLE "investiment"`);
        await queryRunner.query(`DROP TYPE "public"."investiment_approximatedmonthlygains_enum"`);
        await queryRunner.query(`DROP TYPE "public"."investiment_investmenttype_enum"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TYPE "public"."card_cardtype_enum"`);
    }

}
