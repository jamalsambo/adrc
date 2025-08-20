import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeUserColumn1755713243201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "users", // nome da tabela
            "user_type_id", // nome da coluna
            new TableColumn({
                name: "user_type_id",
                type: "uuid",
                isNullable: true, // agora pode ser NULL
            })
        );

        await queryRunner.query(
            `UPDATE users SET user_type_id='8fc33c1e-f6ae-440b-8bd4-051e7fb18b42'	WHERE id='8606c93a-5c8b-4867-bf2c-bccab87aa291'`,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
