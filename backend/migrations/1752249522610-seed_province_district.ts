import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProvinceDistrict1752249522610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO provinces (id, name)
        VALUES
        ('1b737cb6-8c40-489a-a994-884d4119b440', 'Maputo'),
        ('e91075e5-1248-4e53-bab9-ea88f628c77e', 'Gaza'),
        ('6173391b-6a09-45d0-a9ed-fe137f52a5f9', 'Inhambane'),
        ('a36d6839-6b05-4399-b806-0cc300807535', 'Nampula'),
        ('ccbd934e-d1c1-44c1-9525-eb03ba18fdcc', 'Sofala'),
        ('e83d973a-4a86-49a9-bad3-a26f70d52634', 'Tete'),
        ('027f6dd1-06b2-4f2f-aedf-6852e4c8bab2', 'Zambézia'),
        ('c9ee69df-4fe4-4c25-b1d6-672991fdab31', 'Cabo Delgado'),
        ('f2eeae39-c632-4462-921e-1bfcbd4c0158', 'Niassa'),
        ('6d16bb62-8417-4013-ba34-62806a0374b4', 'Manica')
      `);

    await queryRunner.query(`
        INSERT INTO districts (id, name, province_id)
        VALUES
        ('d8b974a3-3cab-4475-a78c-f7a576bf2a42', 'Quelimane', '027f6dd1-06b2-4f2f-aedf-6852e4c8bab2'),
        ('3ca5580e-3c36-4699-be5b-4824afa34c27', 'Mocuba', '027f6dd1-06b2-4f2f-aedf-6852e4c8bab2')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
