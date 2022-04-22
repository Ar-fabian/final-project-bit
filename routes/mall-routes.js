const { Router } = require('express');

const { mallPost, mallGet, dataGet, productGet, budget } = require('../controllers/mall-controller');
const router = Router();


router.get('/',dataGet);
router.get('/mall/:mall',mallGet);
router.get('/product/:product', productGet);
router.get('/budget', budget)
router.post('/', mallPost);



module.exports = router;
