import { isEmpty, isNil } from 'ramda';
import { singIn } from '../../sevices/profile/LoginService.js';
import { msgMethodError } from '../../utils/message/responseRest.js';
import { getConnection } from '../../db/knexfile.js';

const TYPE = 'auth';

const msg = msgMethodError(TYPE, 'not body', 400);

const getLogin = async (body) => {
  if (isEmpty(body)) return msg;

  if (isNil(body.user) || isEmpty(body.user)) return msg;
  if (isNil(body.password) || isEmpty(body.password)) return msg;

  const db = getConnection();
  const resp = await singIn(body, db);
  db.destroy();
  return resp;
};

export default { getLogin };
