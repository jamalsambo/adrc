import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInpectionType1752522951359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO inspection_types (id, name)
        VALUES
        (uuid_generate_v4(), 'Inspeção de Hidrômetros'),
        (uuid_generate_v4(), 'Inspeção de Ligações Domiciliares')
      `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
