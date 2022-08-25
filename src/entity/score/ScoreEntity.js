import { isEmpty } from 'ramda';
import { getScore } from '../../sevices/score/ScoreService.js';
import { msgMethodError } from '../../utils/message/responseRest.js';
import { getConnection } from '../../db/knexfile.js';

const TYPE = 'score';

const msg = msgMethodError(TYPE, 'not body', 400);

const getScoreEntity = async (cpf, token) => {
  if (isEmpty(cpf)) return msg;

  const db = getConnection();
  const resp = await getScore(cpf, token , db);
  db.destroy();
  return resp;
};

export default { getScoreEntity };
