import { isEmpty, isNil } from 'ramda';
import {
  create,
  update,
  get,
  Del
} from '../../sevices/materialGoods/materialGoodsService.js';
import { msgMethodError } from '../../utils/message/responseRest.js';
import { normalizePayloadValue as normalizePayload } from '../../utils/globals/normalizePayloads.js';
import { verifyUuid } from '../../utils/globals/Func.js';
import { getConnection } from '../../db/knexfile.js';

const TYPE = 'mGoods';

const msgToken = msgMethodError(TYPE, 'not baerer token', 400);
const msgBody = msgMethodError(TYPE, 'not body', 400);

const createEntity = async (body, token) => {
  if (isEmpty(body)) return msgBody;
  if (isEmpty(token)) return msgToken;

  body = normalizePayload(body);
  const db = getConnection();
  const resp = await create(body, token, db);
  db.destroy();
  return resp;
};
        
const updateEntity = async (body, token) => {
  if (isEmpty(body)) return msgBody;
  if (isEmpty(token)) return msgToken;
  if (isNil(body.id) || isEmpty(body.id)) return msgBody;

  if (!verifyUuid(body.id)) return msgMethodError(TYPE, 'invalid uuid', 400);

  console.log('entity',body )

  body = normalizePayload(body);
  const db = getConnection();
  const resp = await update(body, token, db);
  db.destroy();
  return resp;
};


const getEntity = async (token) => {
  if (isEmpty(token)) return msgToken;

  const db = getConnection();
  const resp = await get( token, db);
  db.destroy();
  return resp;
};


const delEntity = async (id, token ) => {
  if (isEmpty(token)) return msgToken;

  const db = getConnection();
  const resp = await Del(id, token,db);
  db.destroy();
  return resp;
};

export default {
  createEntity,
  updateEntity,
  delEntity,
  getEntity
};
