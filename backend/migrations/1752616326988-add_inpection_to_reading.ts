import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddInpectionToReading1752616326988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'readings',
      new TableColumn({
        name: 'inspection_id',
        type: 'uuid',
        isNullable: true, // ou false dependendo da sua necessidade
      }),
    );

    await queryRunner.createForeignKey(
      'readings',
      new TableForeignKey({
        columnNames: ['inspection_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'inspections',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
