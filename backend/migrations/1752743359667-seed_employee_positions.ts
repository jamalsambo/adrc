import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedEmployeePositions1752743359667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO positions (id, name)
        VALUES
        ('13ef8517-035f-4d65-8ac9-ba4a07605ce9', 'Leitor'),
        ('967949ba-9046-4160-9610-58efdd3b068d', 'Facturador'),
        ('5418f484-9f9f-4ed7-bd18-24ba036a1fb2', 'Director')
      `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
