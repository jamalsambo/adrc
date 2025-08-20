import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1752745568794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO roles (id, name)
        VALUES
        ('13ef8517-035f-4d65-8ac9-ba4a07605ce9', 'Dashboard'),
        ('967949ba-9046-4160-9610-58efdd3b068d', 'Funcionarios'),
        ('5418f484-9f9f-4ed7-bd18-24ba036a1fb2', 'Clientes'),
         ('0858d132-6bc9-4deb-ac90-cfb6ca4daceb', 'Hidrometros'),
         ('d1f42ea7-3e9b-4c06-98a4-87f646250117', 'Inspeção'),
         ('a288bfe6-187d-4df2-990d-ee49db2bdd90', 'Leituras'),
         ('ef28ecac-8c06-4cf0-9b00-5d94194b2e4b', 'Anomalias'),
        ('940712fa-f892-49a5-bd62-8ea86102435d', 'Zonas'),
        ('f842b755-8d9b-4091-abc9-1774892a932b', 'Usuarios')

      `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
