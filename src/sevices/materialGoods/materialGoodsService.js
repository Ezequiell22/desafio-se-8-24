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

const TYPE = 'material_goods';

export const create = async (values, token, db) => {
  let resp = await verifyBaererAuth(token, db);
  if (!resp.success ) return resp;


  try {
    values['id'] = create_UUID();
    values['creation_date'] = brazilJsonDate();
    values['id_user'] = resp.data.id;

    await db(TYPE).insert(values);

    resp = msgCreateSuccess(TYPE, 200);
  } catch (err) {
    resp = msgCreateError(TYPE, err, 404);
  }

  return resp;
};

export const update = async (values, token, db) => {
  let resp = await verifyBaererAuth(token, db);
  if (!resp.success) return resp;

  try {

    const val = {
      ...omit(['id'], values)
    };

    await db(TYPE)
    .where('id', values.id)
    .where('id_user', resp.data.id)
    .update(val);

    resp = msgUpdateSuccess(TYPE, 202);
  } catch (error) {
    resp = msgUpdateError(TYPE, error, 404);
  }

  return resp;
};

export const get = async (token, db) => {
  let resp = await verifyBaererAuth(token, db);
  if (!resp.success) return resp;

  try {
    await db(TYPE)
      .select(
        `${TYPE}.id`,
        `${TYPE}.type`,
        `${TYPE}.description`,
        `${TYPE}.value`
      )
      .where(`${TYPE}.id_user`, resp.data.id)
      .then((response) => {

          resp = msgGetSuccess(TYPE,response, 200);
      
      });

  } catch (error) {
    resp = msgGetError(TYPE, error, 404);
  }

  return resp;
};

export const Del = async (values, token , db) => {

  let resp = await verifyBaererAuth(token, db);
  if (!resp.success) return resp;
  
  try{
    await db(TYPE)
    .delete()
    .where('id', values.id)
    .where('id_user', resp.data.id)
  
    resp = msgDeleteSuccess(TYPE, 404)
  }catch(e){
    resp = msgDeleteError(TYPE, e, 404)
  }
  
  return resp;
}
