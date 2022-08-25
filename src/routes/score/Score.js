import { pathOr, propOr } from 'ramda';
import score from '../../entity/score/ScoreEntity.js';

const TYPE = 'score'

const ScoreRoute = (app) => {
  app.get('/'+TYPE+'/:cpf', async (req, res) => {
    try {
      const response = await score.getScoreEntity(
        pathOr('', ['params', 'cpf'], req),
        pathOr('', ['token'], req));
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: { type: 'internal server error', e: e + '' } });
    }
  });

};

export default ScoreRoute;
