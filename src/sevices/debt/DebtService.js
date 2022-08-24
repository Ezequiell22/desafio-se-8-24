import { isEmpty, omit } from 'ramda';
import { create_UUID, brazilJsonDate } from '../../utils/globals/Func.js';
import { verifyBaererAuth } from '../../utils/validations/Validation.js';
import {
  msgGetSuccess,
  msgGetError,
  msgCreateSuccess,
  msgCreateError,
  msgUpdateSuccess,
  msgUpdateError,
  msgDeleteError,
  msgDeleteSuccess,
} from '../../utils/message/responseRest.js';

const TYPE = 'debt';

export const create = async (values, token, db) => {
  let resp = await verifyBaererAuth(token, db);
  if (!resp.success || !( resp.data.role = 1 )) return resp;

  try {
    values['id'] = create_UUID();
    values['creation_date'] = brazilJsonDate();
    values['id_user'] = values.id_user;

    await db(TYPE).insert(values);

    resp = msgCreateSuccess(TYPE, 200);
  } catch (err) {
    resp = msgCreateError(TYPE, err, 404);
  }

  return resp;
};

export const update = async (values, token, db) => {
  let resp = await verifyBaererAuth(token, db);
  if (!resp.success || !( resp.data.role = 1 )) return resp;

  try {

    const val = {
      ...omit(['id'], values)
    };

    await db(TYPE)
    .where('id', values.id)
    .update(val);

    resp = msgUpdateSuccess(TYPE, 202);
  } catch (error) {
    resp = msgUpdateError(TYPE, error, 404);
  }

  return resp;
};

export const get = async (id_user, token, db) => {
  let resp = await verifyBaererAuth(token, db);
  if (!resp.success || !( resp.data.role = 1 )) return resp;
  let array = [];

  try {
    await db(TYPE)
      .select(
        `${TYPE}.id`,
        `${TYPE}.type`,
        `${TYPE}.description`,
        `${TYPE}.value`,
        `${TYPE}.id_user`,
        `user.cpf`
      )
      .join('user', 'debt.id_user', '=', 'user.id')
      .where(`${TYPE}.id_user`, id_user)
      .then((response) => {
        
          resp = msgGetSuccess(TYPE,response, 200);
        
      });

  } catch (error) {
    resp = msgGetError(TYPE, error, 404);
  }

  return resp;
};

export const Del = async (values, token, db) => {

  let resp = await verifyBaererAuth(token, db);
  if (!resp.success || !( resp.data.role = 1 )) return resp;

  try{
    await db(TYPE)
    .delete()
    .where('id', values.id)
    .where('id_user', values.id_user )
  
    resp = msgDeleteSuccess(TYPE, 404)
  }catch(e){
    resp = msgDeleteError(TYPE, e, 404)
  }
  
  return resp;
}

