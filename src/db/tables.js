import { getConnection } from './knexfile.js';
import { create_UUID, brazilJsonDate, gerarSenha } from '../utils/globals/Func.js'

const generateTables = async () => {
  try {
    //cria conexao 
    const db = getConnection();

    await db.schema.dropTableIfExists('material_goods');
    await db.schema.dropTableIfExists('debt');
    await db.schema.dropTableIfExists('user');

    const existsTusuario = await db.schema.hasTable('user')

    if (!existsTusuario){
      await db.schema.createTable('user', (table) => {
        table.uuid('id').notNullable().unique().primary();
        table.integer('role'); //1 admin - 2 - comum - 3 -convidado etc
        table.string('name').notNullable();
        table.string('hash').notNullable();
        table.string('cpf').notNullable();
        table.string('salt').notNullable();
        table.dateTime('creation_date').notNullable();
        table.string('active').notNullable();
      });
    }

    const existsTbem = await db.schema.hasTable('material_goods')

    if(!existsTbem) {
      await db.schema.createTable('material_goods', (table) => {
        table.uuid('id').notNullable().unique().primary();
        table.string('type'); //imoveis , veiculos
        table.string('description').notNullable();
        table.float('value').notNullable();
        table.dateTime('creation_date').notNullable();
        table.uuid('id_user')
        table.foreign('id_user').references('user.id');
      });
  
    }

    const existsTdivida = await db.schema.hasTable('debt')

    if (!existsTdivida){

      await db.schema.createTable('debt', (table) => {
        table.uuid('id').notNullable().unique().primary();
        table.string('type'); 
        table.string('description').notNullable();
        table.float('value').notNullable();
        table.dateTime('creation_date').notNullable();
        table.uuid('id_user')
        table.foreign('id_user').references('user.id');
      }); 
   
    }

    await db('debt').del()
    await db('material_goods').del()
    await db('user').del()

    //cadastra users
    let passCrypto = gerarSenha('trw1123');

    await db('user').insert({
      id : create_UUID(),
      creation_date : brazilJsonDate(),
      hash :passCrypto.hash,
      salt :passCrypto.salt,
      cpf: '01001001023',
      role: 1,
      name: 'admin1',
      active : true
    });

    passCrypto = gerarSenha('uu6642');

    await db('user').insert({
      id : create_UUID(),
      creation_date : brazilJsonDate(),
      hash :passCrypto.hash,
      salt :passCrypto.salt,
      cpf: '01001001021',
      role: 2,
      name: 'maria_t',
      active : true
    });


    passCrypto = gerarSenha('9938ss1');

    await db('user').insert({
      id : create_UUID(),
      creation_date : brazilJsonDate(),
      hash :passCrypto.hash,
      salt :passCrypto.salt,
      cpf: '01001001022',
      role: 2,
      name: 'jose_almeida',
      active : true
    });

    console.log('success create tables');
    db.destroy();
  } catch (e) {
    console.log(e + " ERRRROOO");
  }
};

export default generateTables;
