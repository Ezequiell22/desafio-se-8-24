
import { getAll } from '../../sevices/profile/ProfileService.js';
import { getConnection } from '../../db/knexfile.js';

const getUsers = async (token, limit, offset) => {
  const db = getConnection();
  const resp = await getAll(token, limit, offset, db);
  db.destroy();
  return resp;
};

export default { getUsers };