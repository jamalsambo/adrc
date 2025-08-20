/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddInpectionType1752521122496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'inspections',
      new TableColumn({
        name: 'inspection_type_id',
        type: 'uuid',
        isNullable: true, // ou false dependendo da sua necessidade
      }),
    );

    await queryRunner.createForeignKey(
      'inspections',
      new TableForeignKey({
        columnNames: ['inspection_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'inspection_types',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
