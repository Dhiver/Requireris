const express = require('express');
const router = express.Router();

const accounts = require('./accounts.js');

router.get('/accounts', accounts.getAll);
router.get('/accounts/:id', accounts.getOne);
router.get('/accounts/:id/verifyToken', accounts.verifyToken);
router.get('/accounts/:id/keyUri', accounts.keyUri);
router.post('/accounts', accounts.create);
router.put('/accounts/:id', accounts.update);
router.delete('/accounts/:id', accounts.delete);

module.exports = router;
