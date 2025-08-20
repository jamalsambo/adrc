import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Readings1752236605257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'readings',
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
            name: 'reading',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'foto_url',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'delegation_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'watermeter_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'customer_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type_reading_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'anomaly_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
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
            columnNames: ['delegation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delegations',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['watermeter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'watermeters',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['type_reading_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'types_readings',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['anomaly_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'anomalies',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
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
