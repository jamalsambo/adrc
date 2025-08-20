import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InspectionsHasWatermeters1752237924537
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inspections_has_watermeters',
        columns: [
          {
            name: 'inspection_id',
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
            name: 'employee_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'inspection',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['inspection_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'inspections',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['watermeter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'watermeters',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['employee_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employees',
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
