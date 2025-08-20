import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPermissions1752745946375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO permissions (id, key, name, role_id)
        VALUES
        (uuid_generate_v4(), 'view_inspection', 'Visualizar inspeção', '13ef8517-035f-4d65-8ac9-ba4a07605ce9'),
        (uuid_generate_v4(), 'view_reading', 'Visualizar leitura', '13ef8517-035f-4d65-8ac9-ba4a07605ce9'),
        (uuid_generate_v4(), 'view_watermeter', 'Visualizar Hidrometo', '13ef8517-035f-4d65-8ac9-ba4a07605ce9'),
        (uuid_generate_v4(), 'view_graphic_reading', 'Visualizar grafico de leitura', '13ef8517-035f-4d65-8ac9-ba4a07605ce9'),

        (uuid_generate_v4(), 'create_employee', 'Criar funcionario', '967949ba-9046-4160-9610-58efdd3b068d'),
        (uuid_generate_v4(), 'edit_employee', 'Editar funcionario', '967949ba-9046-4160-9610-58efdd3b068d'),
        (uuid_generate_v4(), 'view_employee', 'Listar funcionario', '967949ba-9046-4160-9610-58efdd3b068d'),
        (uuid_generate_v4(), 'delete_employee', 'Deletar funcionario', '967949ba-9046-4160-9610-58efdd3b068d'),
        (uuid_generate_v4(), 'assign_zone_employee', 'Alocar zonas ao funcionario', '967949ba-9046-4160-9610-58efdd3b068d'),

        (uuid_generate_v4(), 'create_customer', 'Criar cliente', '5418f484-9f9f-4ed7-bd18-24ba036a1fb2'),
        (uuid_generate_v4(), 'edit_customer', 'Editar cliente', '5418f484-9f9f-4ed7-bd18-24ba036a1fb2'),
        (uuid_generate_v4(), 'view_customer', 'Listar cliente', '5418f484-9f9f-4ed7-bd18-24ba036a1fb2'),
        (uuid_generate_v4(), 'delete_customer', 'Deletar cliente', '5418f484-9f9f-4ed7-bd18-24ba036a1fb2'),

        (uuid_generate_v4(), 'create_watermeter', 'Criar hidrometro', '0858d132-6bc9-4deb-ac90-cfb6ca4daceb'),
        (uuid_generate_v4(), 'edit_watermeter', 'Editar hidrometro', '0858d132-6bc9-4deb-ac90-cfb6ca4daceb'),
        (uuid_generate_v4(), 'view_watermeter', 'Listar hidrometro', '0858d132-6bc9-4deb-ac90-cfb6ca4daceb'),
        (uuid_generate_v4(), 'delete_watermeter', 'Deletar hidrometro', '0858d132-6bc9-4deb-ac90-cfb6ca4daceb'),
        (uuid_generate_v4(), 'assign_watemeter_customer', 'Associar hidrometro', '0858d132-6bc9-4deb-ac90-cfb6ca4daceb'),
        (uuid_generate_v4(), 'view_watemeter_reading', 'Visualizar leituras', '0858d132-6bc9-4deb-ac90-cfb6ca4daceb'),

        (uuid_generate_v4(), 'create_inspection', 'Criar inspeção', 'd1f42ea7-3e9b-4c06-98a4-87f646250117'),
        (uuid_generate_v4(), 'edit_inspection', 'Editar inspeção', 'd1f42ea7-3e9b-4c06-98a4-87f646250117'),
        (uuid_generate_v4(), 'view_inspection', 'Listar inspeção', 'd1f42ea7-3e9b-4c06-98a4-87f646250117'),
        (uuid_generate_v4(), 'delete_inspection', 'Deletar inspeção', 'd1f42ea7-3e9b-4c06-98a4-87f646250117'),
        (uuid_generate_v4(), 'distribuite_watermeter', 'Distribuir hidrometros', 'd1f42ea7-3e9b-4c06-98a4-87f646250117'),
        (uuid_generate_v4(), 'view_distribuite_watermeter', 'Visualizar hidrometros', 'd1f42ea7-3e9b-4c06-98a4-87f646250117'),
        (uuid_generate_v4(), 'add_watermeter_inspection', 'Adicionar hidrometro', 'd1f42ea7-3e9b-4c06-98a4-87f646250117'),

        (uuid_generate_v4(), 'view_readings', 'Visualizar leituras', 'a288bfe6-187d-4df2-990d-ee49db2bdd90'),
        (uuid_generate_v4(), 'export_readings', 'Exportar leituras', 'a288bfe6-187d-4df2-990d-ee49db2bdd90'),
        (uuid_generate_v4(), 'create_readings', 'Realizar leitura', 'a288bfe6-187d-4df2-990d-ee49db2bdd90'),
        (uuid_generate_v4(), 'invalid_readings', 'Invalidar leitura', 'a288bfe6-187d-4df2-990d-ee49db2bdd90'),

        (uuid_generate_v4(), 'create_anomaly', 'Criar anomalias', 'ef28ecac-8c06-4cf0-9b00-5d94194b2e4b'),
        (uuid_generate_v4(), 'edit_anomaly', 'Editar anomalias', 'ef28ecac-8c06-4cf0-9b00-5d94194b2e4b'),
        (uuid_generate_v4(), 'view_anomaly', 'Listar anomalias', 'ef28ecac-8c06-4cf0-9b00-5d94194b2e4b'),
        (uuid_generate_v4(), 'delete_anomaly', 'Deletar anomalias', 'ef28ecac-8c06-4cf0-9b00-5d94194b2e4b'),

        (uuid_generate_v4(), 'create_zone', 'Criar zonas', '940712fa-f892-49a5-bd62-8ea86102435d'),
        (uuid_generate_v4(), 'edit_zone', 'Editar zonas', '940712fa-f892-49a5-bd62-8ea86102435d'),
        (uuid_generate_v4(), 'view_zone', 'Listar zonas', '940712fa-f892-49a5-bd62-8ea86102435d'),
        (uuid_generate_v4(), 'delete_zone', 'Deletar zonas', '940712fa-f892-49a5-bd62-8ea86102435d'),

        (uuid_generate_v4(), 'create_user', 'Criar usuarios', 'f842b755-8d9b-4091-abc9-1774892a932b'),
        (uuid_generate_v4(), 'edit_user', 'Editar usuarios', 'f842b755-8d9b-4091-abc9-1774892a932b'),
        (uuid_generate_v4(), 'view_user', 'Listar usuarios', 'f842b755-8d9b-4091-abc9-1774892a932b'),
        (uuid_generate_v4(), 'delete_user', 'Deletar usuarios', 'f842b755-8d9b-4091-abc9-1774892a932b')
      `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
