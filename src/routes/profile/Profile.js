import { pathOr } from 'ramda';
import profile from '../../entity/profile/ProfileEntity.js';

const ProfileRoute = (app) => {
  app.get('/users', async (req, res) => {
    try {
      const response = await profile.getUsers( 
        pathOr('', ['token'], req),
        pathOr(10, ['query', 'limit'], req),
        pathOr(0, ['query', 'offset'], req));
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

};

export default ProfileRoute;