import express from 'express';
import login from './profile/Login.js';
import profile from './profile/Profile.js'
import debt from './debt/Debt.js'
import materialGoods from './materialGoods/MaterialGoods.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 200,
    port: process.env.PORT || process.env.PORT_DEV,
    message: 'Server is running!',
  });
});

login(router);
profile(router);
debt(router);
materialGoods(router);

export default router;
