/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('user_type',{
        id:{
            type:'INT',
            primaryKey:true
        },
        name:{
            type:'TEXT',
            notNull:true
        }
    })

    pgm.createTable('users', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()')  
        },
        name: {
            type: 'TEXT',
            notNull: true
        },
        address:{
            type:'TEXT',
            notNull:true
        },
        phone:{
            type:'TEXT',
            notNull:true
        },
        email:{
            type:'TEXT',
            notNull:true
        },
        user_type:{
            type:'INT',
            references: 'user_type(id)',
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
        },
        password:{
            type:'TEXT',
            notNull:true
        },
        date_registered: {
            type:'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
    })

}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('users')
    pgm.dropTable('user_type')
}
