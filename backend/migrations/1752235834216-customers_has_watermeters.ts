import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CustomersHasWatermeters1752235834216
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers_has_watermeters',
        columns: [
          {
            name: 'customer_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'watermeter_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
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
        ],
        foreignKeys: [
          {
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['watermeter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'watermeters',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['createdBy'],
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
