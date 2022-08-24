import jwt from 'jsonwebtoken';
import { isEmpty } from 'ramda';
import { msgGetSuccess, msgGetError } from '../../utils/message/responseRest.js';
import { login, brazilJsonDate } from '../../utils/globals/Func.js';

const TYPE = 'user';

export const singIn = async (values, db) => {
  let resp;
  let json;
  
  try {
    await db(TYPE)
      .select(
        `${TYPE}.id`,
        `${TYPE}.name`,
        `${TYPE}.salt`,
        `${TYPE}.hash`,
        `${TYPE}.role`,
      )
      .where('name', values.user)
      .where('active', true)
      .then((res) => {
        if (!isEmpty(res)) {
          json = res[0];
        } else {
          resp = msgGetError(TYPE, 'user not exist', 400);
        }
      });

    if (json) {
      //monta jwt
      if (login(values.password, json.salt, json.hash)) {
        const token = jwt.sign({ id: json.id }, process.env.SECRET, {
          expiresIn: 14400000, //4 horas
        });
        resp = msgGetSuccess(
          TYPE,
          {
            auth: true,
            type: 'Bearer',
            token,
          },
          200
        );

        
      } else {
        resp = msgGetError(TYPE, 'invalid user or password', 400);
      }
    }
  } catch (err) {
    resp = msgGetError(TYPE, err, 502);
  }

  return resp;
};

