import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTypeReadings1752268762597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO types_readings (id, name)
        VALUES
        ('b91fd1da-b771-4870-8c77-7c15a46150e9', 'Normal'),
        ('52b1ed27-c7bb-411f-8154-a3cea1a04f33', 'Anomalia')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
