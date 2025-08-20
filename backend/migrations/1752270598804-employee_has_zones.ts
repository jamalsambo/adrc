import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class EmployeeHasZones1752270598804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employee_has_zones',
        columns: [
          {
            name: 'employee_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'zone_id',
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
            columnNames: ['employee_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employees',
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
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
