const { createEmp, readEmp, updateEmp, deleteEmp } = require('../controller/controller');

const router = require('express').Router();

router.post('/newEmp',createEmp);
router.get('/getEmp/:id',readEmp);
router.put('/updateEmp/:id',updateEmp);
router.delete('/deleteEmp/:id',deleteEmp);


module.exports = router;