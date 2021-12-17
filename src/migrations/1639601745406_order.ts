/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('bookorder',{
        id:{
            type:'uuid',
            primaryKey:true,
            default: pgm.func('uuid_generate_v4()') 
        },
        customer_id:{
            type:'uuid',
            references:'users(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        pick_address:{
            type:'TEXT',
            notNull:true
        },
        delivery_address:{
            type:'TEXT',
            notNull:true
        },
        product_name:{
            type:'TEXT',
            notNull:true
        },
        product_category:{
            type:'TEXT',
            notNull:true
        },
        recipient_name:{
            type:'TEXT',
            notNull:true
        },
        order_status:{
            type:'TEXT',
            notNull:true
        },
        weight:{
            type:'INT',
            notNull:true
        },
        order_date:{
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })


    pgm.createTable('truck_type',{
        id:{
            type:'uuid',
            primaryKey:true,
            default:pgm.func('uuid_generate_v4()')
        },
        name:{
            type:'TEXT',
            notNull:true
        },
        max_weight:{
            type:'INT',
            notNull:true
        },
        min_weight:{
            type:'INT',
            notNull:true
        }
    })



    pgm.createTable('driver_delivery',{
        id:{
            type:'uuid',
            primaryKey:true,
            default: pgm.func('uuid_generate_v4()')  
        },
        driver_id:{
            type:'uuid',
            references:'users(id)',
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
        },
        order_id:{
            type:'uuid',
            references:'bookorder(id)',
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
        },
        truck_type:{
            type:'uuid',
            references:'truck_type(id)',
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
        }
    })


    pgm.createTable('transaction',{
        id:{
            type:'TEXT',
            primaryKey:true
        },
        payment_amount:{
            type:'INT',
            notNull:true
        },
        payment_status:{
            type:'TEXT',
            notNull:true
        },
        order_id:{
            type:'uuid',
            references:'bookorder(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        transaction_date:{
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })


}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('driver_delivery')
    pgm.dropTable('transaction')
    pgm.dropTable('bookorder')
    pgm.dropTable('truck_type')

}
