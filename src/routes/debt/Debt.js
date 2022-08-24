import { pathOr, propOr } from 'ramda';
import debt from '../../entity/debt/DebtEntity.js';

const TYPE = 'debt'

const DebtRoute = (app) => {
  app.post('/'+TYPE, async (req, res) => {
    try {
      const response = await debt.createEntity(propOr('', ['body'], req));
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

  app.put('/'+TYPE, async (req, res) => {
    try {
      const response = await debt.updateEntity(propOr('', ['body'], req));
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

  app.get('/' + TYPE +'/:id' , async (req, res) => {
    try {
      const response = await debt.getEntity(
        pathOr('', ['params', 'id'], req),
        pathOr('', ['token'], req)
      );
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e+ '' } });
    }
  });

  app.delete('/' + TYPE + '/:id', async (req, res) => {
    try {
      const response = await debt.delDelivery(
        pathOr('', ['params', 'id'], req),
        pathOr('', ['token'], req)
      );
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e } });
    }
  });

};

export default DebtRoute;
