import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnToWatermeter1755892423139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'watermeters',
            new TableColumn({
                name: 'block',
                type: 'int',
                isNullable: true, // ou false dependendo da sua necessidade
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
