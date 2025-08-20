import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Watermeters1752235010565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'watermeters',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lantitude',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'delegation_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'zone_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'createdBy',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedBy',
            type: 'uuid',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['delegation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delegations',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['zone_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zones',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['createdBy'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['updatedBy'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
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
