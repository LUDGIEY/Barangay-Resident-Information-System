const express = require('express');
const router = express.Router();
const blotterController = require('../controllers/blotterController');

router.get('/', blotterController.getAllBlotters);
router.get('/:id', blotterController.getBlotterById);
router.post('/', blotterController.createBlotter);
router.put('/:id', blotterController.updateBlotter);
router.delete('/:id', blotterController.deleteBlotter);

module.exports = router;
