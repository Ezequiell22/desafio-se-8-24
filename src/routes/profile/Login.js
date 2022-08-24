import { propOr } from 'ramda';
import login from '../../entity/profile/LoginEntity.js';

const loginRoute = (app) => {
  app.post('/login', async (req, res) => {
    try {
      const response = await login.getLogin(propOr('', ['body'], req));
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

};

export default loginRoute;
