import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1631993775524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    default: "uuid_generate_v4()"
                },
                {
                    name: "user_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "cascade"
                },
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "orders_games",
            columns: [
                {
                    name: "order_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "game_id",
                    type: "uuid",
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["order_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "orders",
                    onDelete: "cascade"
                },
                {
                    columnNames: ["game_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "games",
                    onDelete: "cascade"
                },
            ],
            uniques: [
                {
                    columnNames: ["order_id", "game_id"],
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders_games");
        await queryRunner.dropTable("orders");
    }

}
