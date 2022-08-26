import { pathOr, propOr } from 'ramda';
import material_goods from '../../entity/materialGoods/MaterialGoodsEntity.js';

const TYPE = 'mgoods'

const DebtRoute = (app) => {
  app.post('/'+TYPE, async (req, res) => {
    try {
      const response = await material_goods.createEntity(
        propOr('', ['body'], req),
        pathOr('', ['token'], req));
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

  app.put('/'+TYPE, async (req, res) => {
    try {
      const response = await material_goods.updateEntity(
        propOr('', ['body'], req),
        pathOr('', ['token'], req));
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

  app.get('/' + TYPE , async (req, res) => {
    try {
      const response = await material_goods.getEntity(
        pathOr('', ['token'], req)
      );
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

  app.delete('/' + TYPE + '/:id', async (req, res) => {
    try {
      const response = await material_goods.delEntity(
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
