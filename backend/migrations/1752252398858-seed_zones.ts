import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedZones1752252398858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO zones (id, name, district_id)
        VALUES
        ('1b737cb6-8c40-489a-a994-884d4119b440', 'Aeroporto', 'd8b974a3-3cab-4475-a78c-f7a576bf2a42'),
        ('e91075e5-1248-4e53-bab9-ea88f628c77e', 'Brandão', 'd8b974a3-3cab-4475-a78c-f7a576bf2a42'),
        ('6173391b-6a09-45d0-a9ed-fe137f52a5f9', 'Cança', 'd8b974a3-3cab-4475-a78c-f7a576bf2a42'),
        ('a36d6839-6b05-4399-b806-0cc300807535', 'Samague', 'd8b974a3-3cab-4475-a78c-f7a576bf2a42'),
        ('ccbd934e-d1c1-44c1-9525-eb03ba18fdcc', 'Manhaua', 'd8b974a3-3cab-4475-a78c-f7a576bf2a42')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
