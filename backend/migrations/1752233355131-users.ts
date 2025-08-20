import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1752233355131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'display_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'inactive',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'dt_inative',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'delegation_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user_types',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['delegation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delegations',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
