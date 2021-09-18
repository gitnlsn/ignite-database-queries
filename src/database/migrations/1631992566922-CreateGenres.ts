import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGenres1631992566922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "genres",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isNullable: false,
                    default: "uuid_generate_v4()"
                },
                {
                    name: "name",
                    type: "string",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "string",
                }
            ],
        }), true);

        await queryRunner.createTable(new Table({
            name: "games_genres",
            columns: [
                {
                    name: "game_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "genre_id",
                    type: "uuid",
                    isNullable: false,
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["game_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "games",
                    onDelete: "cascade"
                },
                {
                    columnNames: ["genre_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "genres",
                    onDelete: "cascade",
                }
            ],
            uniques: [
                {
                    columnNames: ["games_id", "genre_id"],
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("games_genres");
        await queryRunner.dropTable("genres");
    }

}
