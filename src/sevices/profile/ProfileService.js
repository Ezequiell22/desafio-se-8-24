import { verifyBaererAuth } from '../../utils/validations/Validation';
import {
  msgGetSuccess,
  msgGetError
} from '../../utils/message/responseRest';

const TYPE = 'user'

export const getAll = async (token, limit, offset, db) => {
    let resp = await verifyBaererAuth(token, db);
    if ((!resp.success)  ||  !( resp.data.role = 1) ) return resp;
  
    let quant = 0;
  
    await db(TYPE)
      .count('id as quant')
      .then((response) => {
        quant = response[0].quant;
      })
      .catch((e) => (resp = msgGetError(TYPE, e, 404)));
  
    await db(TYPE)
        .select(
        `${TYPE}.id`,
        `${TYPE}.name`,
        `${TYPE}.role`,
        `${TYPE}.cpf`,
      )
      .where('active', true)
      .limit(limit)
      .offset(offset)
      .orderBy(`${TYPE}.name`, 'asc')
      .then((response) => {
        
        resp = msgGetSuccess(TYPE, response, 200);
      })
      .catch((e) => (resp = msgGetError(TYPE, e, 404)));
  
    resp['count'] = quant;
    return resp;
  };