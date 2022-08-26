import { calcScore } from './ScoreService.js'

describe('calc Score test', () => {
    it('should calc score', () => {
    const bebt = 500, mGoods = 500;

    const score = calcScore(bebt, mGoods );
    expect(score).toBe(500);

    });  
})