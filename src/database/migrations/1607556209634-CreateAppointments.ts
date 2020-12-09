import { query } from "express";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1607556209634 implements MigrationInterface {
  // O que será feito no banco de dados
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      // Criando tabelas
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ]
      })
    )
  }
  // fallback -> deletar/desfazer o que foi feito no método up
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments')
  }
}
